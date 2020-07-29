import { inject, injectable } from 'tsyringe';
import Establishment from '@establishments/infra/typeorm/entities/Establishment';
import IStatisticsRepository from '@establishments/statistics/repositories/IStatisticsRepository';
import IStatisticTypesRepository from '@establishments/statistics/statistic-types/repositories/IStatisticTypesRepository';
import AppError from '@shared/errors/AppError';
import { formatISO } from 'date-fns';

interface Return {
  symptom: string;
  value: number;
}

@injectable()
class ListUsersSymptomsTotalService {
  constructor(
    @inject('StatisticsRepository')
    private statisticsRepository: IStatisticsRepository,
    @inject('StatisticTypesRepository')
    private statisticTypesRepository: IStatisticTypesRepository,
  ) {}

  public async execute(establishment: Establishment): Promise<Return[]> {
    const date = new Date(formatISO(new Date(), { representation: 'date' }));
    const data: Return[] = [];
    const symptoms = [
      {
        column: 'smellLoss',
        shortName: 'Perda do olfato',
        name: 'Total Perda do olfato',
        type: {},
      },
      {
        column: 'tasteLoss',
        shortName: 'Perda do paladar',
        name: 'Total Perda do paladar',
        type: {},
      },
      {
        column: 'appetiteLoss',
        shortName: 'Perda de apetite',
        name: 'Total Perda de apetite',
        type: {},
      },
      {
        column: 'fatigue',
        shortName: 'Cansaço ou dor no corpo',
        name: 'Total Cansaço',
        type: {},
      },
      { column: 'fever', shortName: 'Febre', name: 'Total Febre', type: {} },
      {
        column: 'cough',
        shortName: 'Tosse persistente',
        name: 'Total Tosse persistente',
        type: {},
      },
      {
        column: 'diarrhea',
        shortName: 'Diarréia ou dor de barriga',
        name: 'Total Diarréia',
        type: {},
      },
      {
        column: 'soreThroat',
        shortName: 'Dor de garganta ou rouquidão ',
        name: 'Total Rouquidão',
        type: {},
      },
      {
        column: 'shortnessOfBreath',
        shortName: 'Falta de ar ou dor ao respirar',
        name: 'Total Falta de ar',
        type: {},
      },
      {
        column: 'nasalCongestion',
        shortName: 'Congestão nasal ou coriza',
        name: 'Total Congestão nasal',
        type: {},
      },
      {
        column: 'headache',
        shortName: 'Dor de cabeça persistente',
        name: 'Total Dor de cabeça',
        type: {},
      },
    ];

    for (const symptom of symptoms) {
      let type = await this.statisticTypesRepository.findByName(symptom.name);

      if (!type) {
        throw new AppError(
          `Tipo de Estatística ${symptom.name} não encontrada!`,
          404,
        );
      }
      symptom.type = type;
    }

    for (const symptom of symptoms) {
      const statistic = await this.statisticsRepository.findByEstablishmentByTypeByDate(
        establishment.id,
        //@ts-ignore
        symptom.type.id,
        date,
      );
      if (statistic && statistic.value > 0) {
        data.push({ symptom: symptom.shortName, value: statistic.value });
      }
    }

    data.sort(this.sort);
    return data;
  }

  public sort(a: Return, b: Return) {
    return b.value - a.value;
  }
}

export default ListUsersSymptomsTotalService;
