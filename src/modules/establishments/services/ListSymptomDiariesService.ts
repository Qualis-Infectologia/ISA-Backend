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
class ListSymptomDiariesService {
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
        name: 'Perda do olfato diários',
        shortName: 'Perda do olfato (cheiro)',
        type: {},
      },
      {
        column: 'tasteLoss',
        name: 'Perda do paladar diários',
        shortName: 'Perda do paladar (gosto)',
        type: {},
      },
      {
        column: 'appetiteLoss',
        name: 'Perda de apetite diários',
        shortName: 'Perda de apetite',
        type: {},
      },
      {
        column: 'fatigue',
        name: 'Cansaço diários',
        shortName: 'Cansaço ou dor no corpo',
        type: {},
      },
      { column: 'fever', name: 'Febre diários', shortName: 'Febre', type: {} },
      {
        column: 'cough',
        name: 'Tosse persistente diários',
        shortName: 'Tosse persistente',
        type: {},
      },
      {
        column: 'diarrhea',
        name: 'Diarréia diários',
        shortName: 'Diarréia ou dor de barriga',
        type: {},
      },
      {
        column: 'soreThroat',
        name: 'Rouquidão diários',
        shortName: 'Dor de garganta ou rouquidão ',
        type: {},
      },
      {
        column: 'shortnessOfBreath',
        name: 'Falta de ar diários',
        shortName: 'Falta de ar ou dor ao respirar',
        type: {},
      },
      {
        column: 'headache',
        name: 'Dor de cabeça diários',
        shortName: 'Dor de cabeça persistente',
        type: {},
      },
      {
        column: 'nasalCongestion',
        name: 'Congestão nasal diários',
        shortName: 'Congestão nasal ou coriza',
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

export default ListSymptomDiariesService;
