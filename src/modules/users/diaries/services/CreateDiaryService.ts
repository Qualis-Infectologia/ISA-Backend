import { inject, injectable, container } from "tsyringe";
import IDiariesRepository from "../repositories/IDiariesRepository";
import User from "@users/infra/typeorm/entities/User";
import IQueueProvider from "@shared/container/providers/QueueProvider/models/IQueueProvider";
import IRolesRepository from "@security/roles/repositories/IRolesRepository";
import AppError from "@shared/errors/AppError";
import Establishment from "@establishments/infra/typeorm/entities/Establishment";
import IUsersRepository from "@users/repositories/IUsersRepository";
import MailerConfigSingleton from "@shared/container/providers/MailsProvider/singleton/MailerConfigSingleton";
import MailerDestinatariesSingleton
  from "@shared/container/providers/MailsProvider/singleton/MailerDestinatariesSingleton";
import KeycloakAdmin from '@shared/keycloak/keycloak-admin'
import ShowBaselineService from '@users/baselines/services/ShowBaselineService';

interface Request {
  smellLoss: boolean;
  tasteLoss: boolean;
  appetiteLoss: boolean;
  fatigue: boolean;
  fever: boolean;
  cough: boolean;
  diarrhea: boolean;
  delirium: boolean;
  soreThroat: boolean;
  shortnessOfBreath: boolean;
  abdominalPain: boolean;
  chestPain: boolean;
  approved?: boolean;
}

@injectable()
class CreateDiaryService {
  constructor(
    @inject("DiariesRepository")
    private diariesRepository: IDiariesRepository,
    @inject("RolesRepository")
    private rolesRepository: IRolesRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  public async execute(
    data: Request,
    userId: string,
    establishment: Establishment
  ): Promise<Object> {
    const entries = Object.entries(data);
    let symptoms: string[] = [];
    let responsible = [];
    let approved = true;

    entries.map((entries) => {
      if (entries[1]) {
        symptoms.push(this.choiceSymptom(entries[0]));
        approved = false;
      }
    });


    if (!approved) {
      const roleInfectologist = await KeycloakAdmin.getRoleByName(
        "infectologist"
      )
      if (!roleInfectologist) {
        throw new AppError("Perfil não encontrado", 404);
      }

      const infectologists = await KeycloakAdmin.getUsersFromRole(
        "infectologist"
      );

      const role = await KeycloakAdmin.getRoleByName("responsible");

      if (!role) {
        throw new AppError("Perfil não encontrado", 404);
      }

      responsible = await KeycloakAdmin.getUsersFromRole("responsible")

      if(!responsible){
        throw new AppError("sem responsaveis", 500 )
      }
      const queue = container.resolve<IQueueProvider>("QueueProvider");

      const baseline = container.resolve(ShowBaselineService)
      const user = await baseline.execute(userId)

      const mailerDestinataries = await MailerDestinatariesSingleton
      const mailerSender = await MailerConfigSingleton
      queue.runJob("SendMailUserNotApproved", {
          to: mailerDestinataries.getUsersNotApprovedIsActive() ? mailerDestinataries.getUsersNotApproved() : "",
          from: mailerSender.getIsActive() ? mailerSender.getConfig() : "",
          data: {
            name: "Infectologistas",
            attended: user,
            symptoms,
            establishment: establishment.name,
            responsible,
          },
        });
      responsible.map(async (responsible:any) => {
        queue.runJob("SendMailUserNotApprovedResponsible", {
          to: mailerDestinataries.getUsersNotApprovedIsActive() ? mailerDestinataries.getUsersNotApproved() : "",
          from: mailerSender.getIsActive() ? mailerSender.getConfig(): "",
          data: {
            name: responsible.name,
            attended: user,
            symptoms,
            establishment: establishment.name
          },
        });
        if (process.env.NODE_ENV === "production") {

          queue.runJob("SendSmsUserNotApprovedResponsible", {
            attended: user.username,
            establishment: establishment.name,
            name: responsible.name,
            phone: responsible.phone,
          });
        }
      });

      if (process.env.NODE_ENV === "production") {
        infectologists.map(async (infectologist:any) => {
          await queue.runJob("SendSmsUserNotApproved", {
            attended: user.username,
            establishment: establishment.name,
            name: infectologist.name,
            phone: infectologist.phone,
          });
        });
      }
    }

    const diary = await this.diariesRepository.create({
      userId: userId,
      smellLoss: data.smellLoss,
      tasteLoss: data.tasteLoss,
      appetiteLoss: data.appetiteLoss,
      fatigue: data.fatigue,
      fever: data.fever,
      cough: data.cough,
      diarrhea: data.diarrhea,
      delirium: data.delirium,
      soreThroat: data.soreThroat,
      shortnessOfBreath: data.shortnessOfBreath,
      abdominalPain: data.abdominalPain,
      chestPain: data.chestPain,
      approved,
    });

    return { approved: diary.approved, date: diary.created_at };
  }

  private choiceSymptom(symptom: string): string {
    switch (symptom) {
      case "smellLoss":
        return "Perda do olfato";
      case "tasteLoss":
        return "Perda do paladar";
      case "appetiteLoss":
        return "Perda de apetite";
      case "fatigue":
        return "Cansaço";
      case "fever":
        return "Febre";
      case "cough":
        return "Tosse persistente";
      case "diarrhea":
        return "Diarréia";
      case "delirium":
        return "Delírios";
      case "soreThroat":
        return "Rouquidão ou Dor de Garganta";
      case "shortnessOfBreath":
        return "Falta de ar";
      case "abdominalPain":
        return "Dor abdominal";
      case "chestPain":
        return "Dor torácica";
      default:
        return symptom;
    }
  }
}

export default CreateDiaryService;
