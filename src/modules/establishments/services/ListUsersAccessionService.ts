import { inject, injectable } from 'tsyringe';
import Establishment from '@establishments/infra/typeorm/entities/Establishment';
import { eachDayOfInterval, parseISO, formatISO, addDays } from 'date-fns';
import IStatisticsRepository from '@establishments/statistics/repositories/IStatisticsRepository';
import IStatisticTypesRepository from '@establishments/statistics/statistic-types/repositories/IStatisticTypesRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class ListUsersAccessionService {
  constructor(
    @inject('StatisticsRepository')
    private statisticsRepository: IStatisticsRepository,
    @inject('StatisticTypesRepository')
    private statisticTypesRepository: IStatisticTypesRepository,
  ) {}

  public async execute(
    establishment: Establishment,
    startDate: string,
    endDate: string,
  ): Promise<any[]> {
    const days = eachDayOfInterval({
      start: parseISO(startDate),
      end: parseISO(endDate),
    });
    const data = [];
    const type = await this.statisticTypesRepository.findByName('Adesão');
    if (!type) {
      throw new AppError('Tipo de Estatística Adesão não encontrada', 404);
    }

    const typeUsers = await this.statisticTypesRepository.findByName(
      'Usuários Adesão',
    );
    if (!typeUsers) {
      throw new AppError(
        'Tipo de Estatística Usuários Adesão não encontrada',
        404,
      );
    }

    for (const day of days) {
      let value = 0;
      let users = 0;
      const statistic = await this.statisticsRepository.findByEstablishmentByTypeByDate(
        establishment.id,
        type.id,
        addDays(day, 1),
      );

      const statisticUsers = await this.statisticsRepository.findByEstablishmentByTypeByDate(
        establishment.id,
        typeUsers.id,
        addDays(day, 1),
      );

      if (statistic) {
        value = statistic.value;
      }
      if (statisticUsers) {
        users = statisticUsers.value;
      }

      data.push({
        date: formatISO(day, { representation: 'date' }),
        accession: {
          value,
          users,
        },
      });
    }

    return data;
  }
}

export default ListUsersAccessionService;
