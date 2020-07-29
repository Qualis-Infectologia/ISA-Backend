import { container } from 'tsyringe';
import IEstablishmentsRepository from '@establishments/repositories/IEstablishmentsRepository';
import { subDays } from 'date-fns';
import IDiariesRepository from '@users/diaries/repositories/IDiariesRepository';
import IStatisticsRepository from '@establishments/statistics/repositories/IStatisticsRepository';
import IStatisticTypesRepository from '@establishments/statistics/statistic-types/repositories/IStatisticTypesRepository';
import AppError from '@shared/errors/AppError';

export default async function UsersAccession() {
  const date = subDays(new Date(), 1);
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
  const typeAccession = await statisticTypesRepository.findByName('Adesão');

  const typeAllAccession = await statisticTypesRepository.findByName(
    'Total Adesão',
  );

  const typeAllAccessionUsers = await statisticTypesRepository.findByName(
    'Total Usuários Adesão',
  );

  const typeAccessionUsers = await statisticTypesRepository.findByName(
    'Usuários Adesão',
  );

  const typeAllSymptomaticUsers = await statisticTypesRepository.findByName(
    'Total Sintomáticos',
  );

  const typeSymptomaticUsers = await statisticTypesRepository.findByName(
    'Sintomáticos',
  );

  if (
    !typeAccession ||
    !typeAccessionUsers ||
    !typeAllAccessionUsers ||
    !typeAllAccession ||
    !typeAllSymptomaticUsers ||
    !typeSymptomaticUsers
  ) {
    throw new AppError('Tipo de Estatística não encontrada', 404);
  }

  let accession = 0;
  let accessionUsers = 0;
  let totalUsers = 0;
  let totalAccession = 0;
  let totalAccessionUsers = 0;
  let allUsers = 0;
  let symptomatic = 0;
  let allSymptomatic = 0;

  const qualis = await establishmentRepository.findByName('Qualis');

  if (!qualis) {
    throw new AppError('Qualis não encontrada', 404);
  }

  for (const establishment of establishments) {
    accession = 0;
    accessionUsers = 0;
    symptomatic = 0;
    totalUsers = establishment.users.length;

    for (const user of establishment.users) {
      const diary = await diariesRepository.findByRangeDateByUser(
        date,
        user.id,
      );
      if (diary) {
        accessionUsers++;
        if (!diary.approved) {
          symptomatic++;
        }
      }
    }

    totalAccessionUsers += accessionUsers;
    allUsers += totalUsers;
    allSymptomatic += symptomatic;

    if (totalUsers > 0) {
      accession = (accessionUsers / totalUsers) * 100;
    }

    await statisticsRepository.create({
      establishment,
      statisticType: typeAccession,
      value: accession,
    });

    await statisticsRepository.create({
      establishment,
      statisticType: typeAccessionUsers,
      value: accessionUsers,
    });

    await statisticsRepository.create({
      establishment,
      statisticType: typeSymptomaticUsers,
      value: symptomatic,
    });
  }

  totalAccession = (totalAccessionUsers / allUsers) * 100;

  await statisticsRepository.create({
    establishment: qualis,
    statisticType: typeAllAccession,
    value: totalAccession,
  });

  await statisticsRepository.create({
    establishment: qualis,
    statisticType: typeAllAccessionUsers,
    value: totalAccessionUsers,
  });

  await statisticsRepository.create({
    establishment: qualis,
    statisticType: typeAllSymptomaticUsers,
    value: allSymptomatic,
  });
}
