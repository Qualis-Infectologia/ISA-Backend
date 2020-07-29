import { inject, injectable, container } from 'tsyringe';
import User from '@users/infra/typeorm/entities/User';
import IEvaluationsRepository from '../repositories/IEvaluationsRepository';
import IDiariesRepository from '@users/diaries/repositories/IDiariesRepository';
import IUsersRepository from '@users/repositories/IUsersRepository';
import IRolesRepository from '@security/roles/repositories/IRolesRepository';
import AppError from '@shared/errors/AppError';
import IQueueProvider from '@shared/container/providers/QueueProvider/models/IQueueProvider';
import IEstablishmentsRepository from '@establishments/repositories/IEstablishmentsRepository';
import Evaluation from '../infra/typeorm/entities/Evaluation';
import { addDays, formatISO, format } from 'date-fns';
import StatusEnum from '@users/enums/StatusEnum';
import app from '@shared/infra/http/app';

interface Request {
  userId: string;
  liberate: boolean;
  days?: number;
  annotation: string;
  diaryId: string;
  infecto: User;
}

@injectable()
class CreateEvaluationService {
  constructor(
    @inject('DiariesRepository')
    private diariesRepository: IDiariesRepository,
    @inject('EvaluationsRepository')
    private evaluationsRepository: IEvaluationsRepository,
    @inject('EstablishmentsRepository')
    private establishmentsRepository: IEstablishmentsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  public async execute({
    userId,
    liberate,
    days,
    annotation,
    diaryId,
    infecto,
  }: Request): Promise<Evaluation> {
    let responsible: User[] = [];
    let blocked_until = '';
    let date = '';

    if (days) {
      blocked_until = formatISO(addDays(new Date(), days - 1), {
        representation: 'date',
      });

      date = format(addDays(new Date(), days - 1), 'dd/MM/yyy');
    }

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }

    const diary = await this.diariesRepository.findById(diaryId);

    if (!diary) {
      throw new AppError('Diario não encontrado', 404);
    }

    if (!liberate) {
      const evaluation = await this.evaluationsRepository.create({
        user,
        infecto,
        annotation,
        days,
        diary,
        liberate,
        blocked_until,
      });
      user.status = StatusEnum.Denied;
      await this.usersRepository.save(user);

      const establishment = await this.establishmentsRepository.findById(
        user.establishments[0].id,
      );

      const role = await this.rolesRepository.findByName('Responsável');

      if (!role) {
        throw new AppError('Perfil não encontrado', 404);
      }

      if (!establishment) {
        throw new AppError('Estabelecimento não encontrado', 404);
      }

      responsible = establishment.users.filter(user => {
        if (user.roleId === role.id) {
          return true;
        }
        return false;
      });

      const queue = container.resolve<IQueueProvider>('QueueProvider');
      responsible.map(responsible => {
        queue.runJob('SendMailUserNotLiberateResponsible', {
          to: {
            address: responsible.email,
            name: responsible.name,
          },
          from: {
            address: 'infectologistas@portalqualis.com.br',
            name: 'Infectologistas - Qualis',
          },
          data: {
            name: responsible.name,
            attended: user,
            establishment: establishment.name,
            days,
            blocked_until: date,
            infecto,
          },
        });
        if (process.env.NODE_ENV === 'production') {
          queue.runJob('SendSmsUserNotLiberateResponsible', {
            attended: user.name,
            name: responsible.name,
            phone: responsible.phone,
            days,
          });
        }
      });
      app.Io.emit('userEvaluation');

      return evaluation;
    } else {
      user.status = StatusEnum.Liberate;
      await this.usersRepository.save(user);
      const evaluation = await this.evaluationsRepository.create({
        user,
        infecto,
        annotation,
        diary,
        liberate,
      });

      app.Io.emit('userEvaluation');
      return evaluation;
    }
  }
}

export default CreateEvaluationService;
