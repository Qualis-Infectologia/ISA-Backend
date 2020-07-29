import { inject, injectable, container } from 'tsyringe';
import IDiariesRepository from '../repositories/IDiariesRepository';
import User from '@users/infra/typeorm/entities/User';
import IQueueProvider from '@shared/container/providers/QueueProvider/models/IQueueProvider';
import IRolesRepository from '@security/roles/repositories/IRolesRepository';
import AppError from '@shared/errors/AppError';
import Establishment from '@establishments/infra/typeorm/entities/Establishment';
import IUsersRepository from '@users/repositories/IUsersRepository';
import StatusEnum from '@users/enums/StatusEnum';
import app from '@shared/infra/http/app';
import MailerConfigSingleton from '@shared/container/providers/MailsProvider/singleton/MailerConfigSingleton';
import MailerDestinatariesSingleton from '@shared/container/providers/MailsProvider/singleton/MailerDestinatariesSingleton';
import KeycloakAdmin from '@shared/keycloak/keycloak-admin';
import ShowBaselineService from '@users/baselines/services/ShowBaselineService';

interface Request {
  user?: User;
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
  nasalCongestion: boolean;
  headache: boolean;
  approved?: boolean;
}

@injectable()
class CreateDiaryService {
  constructor(
    @inject('DiariesRepository')
    private diariesRepository: IDiariesRepository,
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(
    data: Request,
    userId: string,
    establishment: Establishment,
  ): Promise<Object> {
    const entries = Object.entries(data);
    let symptoms: string[] = [];
    let responsible: User[] = [];
    let approved = true;

    entries.map(entries => {
      if (entries[1]) {
        symptoms.push(this.choiceSymptom(entries[0]));
        approved = false;
      }
    });

    if (!approved) {
      const roleInfectologist = await KeycloakAdmin.getRoleByName(
        'infectologist',
      );
      if (!roleInfectologist) {
        throw new AppError('Perfil não encontrado', 404);
      }

      const infectologists = await KeycloakAdmin.getUsersFromRole(
        'infectologist',
      );

      const role = await KeycloakAdmin.getRoleByName('responsible');

      if (!role) {
        throw new AppError('Perfil não encontrado', 404);
      }

      responsible = await KeycloakAdmin.getUsersFromRole('responsible');

      if (!responsible) {
        throw new AppError('sem responsáveis', 500);
      }

      const queue = container.resolve<IQueueProvider>('QueueProvider');

      const baseline = container.resolve(ShowBaselineService);
      const user = await baseline.execute(userId);

      const mailerDestinataries = await MailerDestinatariesSingleton;
      const mailerSender = await MailerConfigSingleton;

      queue.runJob('SendMailUserNotApproved', {
        to: mailerDestinataries.getUsersNotApprovedIsActive()
          ? mailerDestinataries.getUsersNotApproved()
          : '',
        from: mailerSender.getIsActive() ? mailerSender.getConfig() : '',
        data: {
          name: 'Infectologistas',
          attended: user,
          symptoms,
          establishment: establishment.name,
          responsible,
        },
      });
      responsible.map(async (responsible: any) => {
        queue.runJob('SendMailUserNotApprovedResponsible', {
          to: mailerDestinataries.getUsersNotApprovedIsActive()
            ? mailerDestinataries.getUsersNotApproved()
            : '',
          from: mailerSender.getIsActive() ? mailerSender.getConfig() : '',
          data: {
            name: responsible.name,
            attended: user,
            symptoms,
            establishment: establishment.name,
          },
        });
        if (process.env.NODE_ENV === 'production') {
          queue.runJob('SendSmsUserNotApprovedResponsible', {
            attended: user.username,
            establishment: establishment.name,
            name: responsible.name,
            phone: responsible.phone,
          });
        }
      });

      if (process.env.NODE_ENV === 'production') {
        infectologists.map(async (infectologist: any) => {
          await queue.runJob('SendSmsUserNotApproved', {
            attended: user.username,
            establishment: establishment.name,
            name: infectologist.name,
            phone: infectologist.phone,
          });
        });
      }
      user.status = StatusEnum.UnderEvaluation;
      await this.usersRepository.save(user);
      app.Io.emit('userSymptomatic');
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
      soreThroat: data.soreThroat,
      shortnessOfBreath: data.shortnessOfBreath,
      nasalCongestion: data.nasalCongestion,
      headache: data.headache,
      approved,
    });

    return { approved: diary.approved, date: diary.created_at };
  }

  private choiceSymptom(symptom: string): string {
    switch (symptom) {
      case 'smellLoss':
        return 'Perda do olfato (cheiro)';
      case 'tasteLoss':
        return 'Perda do paladar (gosto)';
      case 'appetiteLoss':
        return 'Perda de apetite';
      case 'fatigue':
        return 'Cansaço ou dor no corpo';
      case 'fever':
        return 'Febre';
      case 'cough':
        return 'Tosse persistente';
      case 'diarrhea':
        return 'Diarréia ou dor de barriga';
      case 'soreThroat':
        return 'Dor de garganta ou rouquidão';
      case 'shortnessOfBreath':
        return 'Falta de ar ou dor ao respirar';
      case 'nasalCongestion':
        return 'Congestão nasal ou coriza';
      case 'headache':
        return 'Dor de cabeça persistente';
      default:
        return symptom;
    }
  }
}

export default CreateDiaryService;
