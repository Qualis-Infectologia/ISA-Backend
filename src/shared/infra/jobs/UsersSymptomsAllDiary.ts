import { container } from 'tsyringe';
import IEstablishmentsRepository from '@establishments/repositories/IEstablishmentsRepository';
import IDiariesRepository from '@users/diaries/repositories/IDiariesRepository';
import IStatisticsRepository from '@establishments/statistics/repositories/IStatisticsRepository';
import IStatisticTypesRepository from '@establishments/statistics/statistic-types/repositories/IStatisticTypesRepository';
import AppError from '@shared/errors/AppError';

export default async function UsersSymptomsAllDiary() {
  const establishmentRepository = container.resolve<IEstablishmentsRepository>(
    'EstablishmentsRepository',
  );
  const diariesRepository = container.resolve<IDiariesRepository>(
    'DiariesRepository',
  );
  const statisticsRepository = container.resolve<IStatisticsRepository>(
    'StatisticsRepository',
  );
  const statisticTypesRepository = container.resolve<IStatisticTypesRepository>(
    'StatisticTypesRepository',
  );
  const establishments = await establishmentRepository.findAllWithUsers();

  const symptoms = [
    { column: 'smellLoss', name: 'Perda do olfato diários', type: {} },
    { column: 'tasteLoss', name: 'Perda do paladar diários', type: {} },
    { column: 'appetiteLoss', name: 'Perda de apetite diários', type: {} },
    { column: 'fatigue', name: 'Cansaço diários', type: {} },
    { column: 'fever', name: 'Febre diários', type: {} },
    { column: 'cough', name: 'Tosse persistente diários', type: {} },
    { column: 'diarrhea', name: 'Diarréia diários', type: {} },
    { column: 'soreThroat', name: 'Rouquidão diários', type: {} },
    { column: 'shortnessOfBreath', name: 'Falta de ar diários', type: {} },
    { column: 'headache', name: 'Dor de cabeça diários', type: {} },
    { column: 'nasalCongestion', name: 'Congestão nasal diários', type: {} },
  ];

  const symptomsTotal = [
    { column: 'smellLoss', name: 'Total Perda do olfato diários', type: {} },
    { column: 'tasteLoss', name: 'Total Perda do paladar diários', type: {} },
    {
      column: 'appetiteLoss',
      name: 'Total Perda de apetite diários',
      type: {},
    },
    { column: 'fatigue', name: 'Total Cansaço diários', type: {} },
    { column: 'fever', name: 'Total Febre diários', type: {} },
    { column: 'cough', name: 'Total Tosse persistente diários', type: {} },
    { column: 'diarrhea', name: 'Total Diarréia diários', type: {} },
    { column: 'soreThroat', name: 'Total Rouquidão diários', type: {} },
    {
      column: 'shortnessOfBreath',
      name: 'Total Falta de ar diários',
      type: {},
    },
    { column: 'headache', name: 'Total Dor de cabeça diários', type: {} },
    {
      column: 'nasalCongestion',
      name: 'Total Congestão nasal diários',
      type: {},
    },
  ];

  for (const symptom of symptoms) {
    let type = await statisticTypesRepository.findByName(symptom.name);

    if (!type) {
      throw new AppError(
        `Tipo de Estatística ${symptom.name} não encontrada`,
        404,
      );
    }
    symptom.type = type;
  }

  for (const symptom of symptomsTotal) {
    let type = await statisticTypesRepository.findByName(symptom.name);

    if (!type) {
      throw new AppError(
        `Tipo de Estatística ${symptom.name} não encontrada`,
        404,
      );
    }
    symptom.type = type;
  }

  let occurrences = 0;
  let allOccurrences = 0;
  let totalSymptom = [];

  const qualis = await establishmentRepository.findByName('Qualis');

  if (!qualis) {
    throw new AppError('Qualis não encontrada', 404);
  }

  for (const symptom of symptoms) {
    allOccurrences = 0;
    totalSymptom = symptomsTotal.filter(sym => {
      return sym.column === symptom.column;
    });
    for (const establishment of establishments) {
      occurrences = 0;

      for (const user of establishment.users) {
        const diaries = await diariesRepository.findByUserWithSymptom(
          symptom.column,
          user.id,
        );

        occurrences += diaries;
      }

      allOccurrences += occurrences;

      await statisticsRepository.create({
        establishment: establishment,
        //@ts-ignore
        statisticType: symptom.type,
        value: occurrences,
      });
    }

    await statisticsRepository.create({
      establishment: qualis,
      //@ts-ignore
      statisticType: totalSymptom[0].type,
      value: allOccurrences,
    });
  }
}
