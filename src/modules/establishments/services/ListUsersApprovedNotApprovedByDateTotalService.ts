import { inject, injectable } from 'tsyringe';
import Establishment from '@establishments/infra/typeorm/entities/Establishment';
import { eachDayOfInterval, parseISO, addDays, formatISO } from 'date-fns';
import IStatisticsRepository from '@establishments/statistics/repositories/IStatisticsRepository';
import IStatisticTypesRepository from '@establishments/statistics/statistic-types/repositories/IStatisticTypesRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class ListUsersApprovedNotApprovedByDateTotalService {
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
    let approved = 0;
    let notApproved = 0;
    let userApp = 0;
    let userNot = 0;
    const typeApproved = await this.statisticTypesRepository.findByName(
      'Total Aprovados',
    );

    const typeNotApproved = await this.statisticTypesRepository.findByName(
      'Total Não Aprovados',
    );
    const typeUsersNot = await this.statisticTypesRepository.findByName(
      'Total Usuários Negado',
    );

    const typeUsersApp = await this.statisticTypesRepository.findByName(
      'Total Usuários Permitido',
    );
    const typeUsers = await this.statisticTypesRepository.findByName(
      'Total Usuários',
    );
    if (
      !typeUsers ||
      !typeUsersApp ||
      !typeUsersNot ||
      !typeApproved ||
      !typeNotApproved
    ) {
      throw new AppError('Tipo de Estatística não encontrada', 404);
    }

    for (const day of days) {
      const statisticApproved = await this.statisticsRepository.findByEstablishmentByTypeByDate(
        establishment.id,
        typeApproved.id,
        addDays(day, 1),
      );
      if (statisticApproved) {
        approved = statisticApproved.value;
      } else {
        approved = 0;
      }

      const statisticUserApproved = await this.statisticsRepository.findByEstablishmentByTypeByDate(
        establishment.id,
        typeUsersApp.id,
        addDays(day, 1),
      );
      if (statisticUserApproved) {
        userApp = statisticUserApproved.value;
      } else {
        userApp = 0;
      }

      const statisticNotApproved = await this.statisticsRepository.findByEstablishmentByTypeByDate(
        establishment.id,
        typeNotApproved.id,
        addDays(day, 1),
      );
      if (statisticNotApproved) {
        notApproved = statisticNotApproved.value;
      } else {
        notApproved = 0;
      }

      const statisticUserNotApproved = await this.statisticsRepository.findByEstablishmentByTypeByDate(
        establishment.id,
        typeUsersNot.id,
        addDays(day, 1),
      );
      if (statisticUserNotApproved) {
        userNot = statisticUserNotApproved.value;
      } else {
        userNot = 0;
      }

      data.push({
        date: formatISO(day, { representation: 'date' }),
        approved: { approved, users: userApp },
        notApproved: { notApproved, users: userNot },
      });
    }

    return data;
  }
}

export default ListUsersApprovedNotApprovedByDateTotalService;
