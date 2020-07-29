import { inject, injectable } from 'tsyringe';
import Establishment from '@establishments/infra/typeorm/entities/Establishment';
import IStatisticsRepository from '@establishments/statistics/repositories/IStatisticsRepository';
import IStatisticTypesRepository from '@establishments/statistics/statistic-types/repositories/IStatisticTypesRepository';
import AppError from '@shared/errors/AppError';
import { formatISO } from 'date-fns';

@injectable()
class ListUsersApprovedTotalService {
  constructor(
    @inject('StatisticsRepository')
    private statisticsRepository: IStatisticsRepository,
    @inject('StatisticTypesRepository')
    private statisticTypesRepository: IStatisticTypesRepository,
  ) {}

  public async execute(establishment: Establishment): Promise<number> {
    const date = new Date(formatISO(new Date(), { representation: 'date' }));
    let users = 0;

    const type = await this.statisticTypesRepository.findByName(
      'Total Usuários Permitido',
    );

    if (!type) {
      throw new AppError('Tipo de Estatística não encontrada!', 404);
    }

    const statistic = await this.statisticsRepository.findByEstablishmentByTypeByDate(
      establishment.id,
      type.id,
      date,
    );
    if (statistic) {
      users = statistic.value;
    }

    return users;
  }
}

export default ListUsersApprovedTotalService;
