import { container } from 'tsyringe';
import IEstablishmentsRepository from '@establishments/repositories/IEstablishmentsRepository';
import { subDays } from 'date-fns';
import IDiariesRepository from '@users/diaries/repositories/IDiariesRepository';
import IStatisticsRepository from '@establishments/statistics/repositories/IStatisticsRepository';
import IStatisticTypesRepository from '@establishments/statistics/statistic-types/repositories/IStatisticTypesRepository';
import AppError from '@shared/errors/AppError';

export default async function UsersApprovedNotApproved() {
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
  const typeNotApproved = await statisticTypesRepository.findByName(
    'Não Aprovados',
  );
  const typeApproved = await statisticTypesRepository.findByName('Aprovados');

  const typeAllNotApproved = await statisticTypesRepository.findByName(
    'Total Não Aprovados',
  );
  const typeAllApproved = await statisticTypesRepository.findByName(
    'Total Aprovados',
  );

  const typeUsersApp = await statisticTypesRepository.findByName(
    'Usuários Permitido',
  );
  const typeUsersAppTotal = await statisticTypesRepository.findByName(
    'Total Usuários Permitido',
  );

  const typeUsersNotTotal = await statisticTypesRepository.findByName(
    'Total Usuários Negado',
  );
  const typeUsersNot = await statisticTypesRepository.findByName(
    'Usuários Negado',
  );
  const typeUsersTotal = await statisticTypesRepository.findByName(
    'Total Usuários',
  );
  const typeUsers = await statisticTypesRepository.findByName('Usuários');

  if (
    !typeAllApproved ||
    !typeUsers ||
    !typeUsersApp ||
    !typeUsersAppTotal ||
    !typeUsersNot ||
    !typeUsersNotTotal ||
    !typeUsersTotal ||
    !typeApproved ||
    !typeNotApproved ||
    !typeAllNotApproved
  ) {
    throw new AppError('Tipo de Estatística não encontrada', 404);
  }

  let approved = 0;
  let notApproved = 0;
  let totalUsers = 0;
  let totalApproved = 0;
  let totalNotApproved = 0;
  let allUsers = 0;

  const qualis = await establishmentRepository.findByName('Qualis');

  if (!qualis) {
    throw new AppError('Qualis não encontrada', 404);
  }

  for (const establishment of establishments) {
    approved = 0;
    notApproved = 0;
    totalUsers = establishment.users.length;
    await statisticsRepository.create({
      establishment,
      statisticType: typeUsers,
      value: totalUsers,
    });

    for (const user of establishment.users) {
      const diary = await diariesRepository.findByRangeDateByUser(
        date,
        user.id,
      );
      if (diary) {
        if (diary.approved) {
          approved++;
        } else {
          notApproved++;
        }
      }
    }

    totalApproved += approved;
    totalNotApproved += notApproved;
    allUsers += totalUsers;

    await statisticsRepository.create({
      establishment,
      statisticType: typeUsersNot,
      value: notApproved,
    });

    await statisticsRepository.create({
      establishment,
      statisticType: typeUsersApp,
      value: approved,
    });

    if (totalUsers > 0) {
      approved = (approved / totalUsers) * 100;
      notApproved = (notApproved / totalUsers) * 100;
    }

    await statisticsRepository.create({
      establishment,
      statisticType: typeApproved,
      value: approved,
    });

    await statisticsRepository.create({
      establishment,
      statisticType: typeNotApproved,
      value: notApproved,
    });
  }

  await statisticsRepository.create({
    establishment: qualis,
    statisticType: typeUsersNotTotal,
    value: totalNotApproved,
  });

  await statisticsRepository.create({
    establishment: qualis,
    statisticType: typeUsersAppTotal,
    value: totalApproved,
  });

  totalApproved = (totalApproved / allUsers) * 100;
  totalNotApproved = (totalNotApproved / allUsers) * 100;

  await statisticsRepository.create({
    establishment: qualis,
    statisticType: typeUsersTotal,
    value: allUsers,
  });

  await statisticsRepository.create({
    establishment: qualis,
    statisticType: typeAllApproved,
    value: totalApproved,
  });

  await statisticsRepository.create({
    establishment: qualis,
    statisticType: typeAllNotApproved,
    value: totalNotApproved,
  });
}
