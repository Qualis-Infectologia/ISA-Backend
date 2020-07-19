import { container } from "tsyringe";

import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";

import IBaselinesRepository from "@users/baselines/repositories/IBaselinesRepository";
import BaselinesRepository from "@users/baselines/infra/typeorm/repositories/BaselinesRepository";

import IResourcesRepository from "@security/resources/repositories/IResourcesRepository";
import ResourcesRepository from "@security/resources/infra/typeorm/repositories/ResourcesRepository";

import IRolesRepository from "@security/roles/repositories/IRolesRepository";
import RolesRepository from "@security/roles/infra/typeorm/repositories/RolesRepository";

import IDiariesRepository from "@users/diaries/repositories/IDiariesRepository";
import DiariesRepository from "@users/diaries/infra/typeorm/repositories/DiariesRepository";

import IEstablishmentsRepository from "@establishments/repositories/IEstablishmentsRepository";
import EstablishmentsRepository from "@establishments/infra/typeorm/repositories/EstablishmentsRepository";

import IStatisticTypesRepository from "@establishments/statistics/statistic-types/repositories/IStatisticTypesRepository";
import StatisticTypesRepository from "@establishments/statistics/statistic-types/infra/typeorm/repositories/StatisticTypeRepository";

import IStatisticsRepository from "@establishments/statistics/repositories/IStatisticsRepository";
import StatisticsRepository from "@establishments/statistics/infra/typeorm/repositories/StatisticsRepository";

import ITokensRepository from "@users/tokens/repositories/ITokensRepository";
import TokensRepository from "@users/tokens/infra/typeorm/repositories/TokensRepository";

import IMailerEtherealRepository from '@shared/container/providers/MailsProvider/repositories/IMailerEtherealRepository'
import MailerEtherealRepository from "@shared/container/providers/MailsProvider/infra/typeorm/repositories/MailerEtherealRepository";

import IMailerSesRepository from '@shared/container/providers/MailsProvider/repositories/IMailerSesRepository'
import MailerSesRepository from "@shared/container/providers/MailsProvider/infra/typeorm/repositories/MailerSesRepository";

import ISmsRepository from "@shared/container/providers/SmsProvider/repositories/ISmsRepository";
import SmsRepository from "@shared/container/providers/SmsProvider/infra/typeorm/repositories/SmsRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);
container.registerSingleton<IBaselinesRepository>(
  "BaselinesRepository",
  BaselinesRepository
);

container.registerSingleton<IResourcesRepository>(
  "ResourcesRepository",
  ResourcesRepository
);

container.registerSingleton<IRolesRepository>(
  "RolesRepository",
  RolesRepository
);

container.registerSingleton<IEstablishmentsRepository>(
  "EstablishmentsRepository",
  EstablishmentsRepository
);

container.registerSingleton<IDiariesRepository>(
  "DiariesRepository",
  DiariesRepository
);

container.registerSingleton<IStatisticTypesRepository>(
  "StatisticTypesRepository",
  StatisticTypesRepository
);

container.registerSingleton<IStatisticsRepository>(
  "StatisticsRepository",
  StatisticsRepository
);

container.registerSingleton<ITokensRepository>(
  "TokensRepository",
  TokensRepository
);

container.registerSingleton<IMailerEtherealRepository>(
  "MailerEtherealRepository",
  MailerEtherealRepository
)
container.registerSingleton<IMailerSesRepository>(
  "MailerSesRepository",
  MailerSesRepository
)
container.registerSingleton<ISmsRepository>(
  "SmsRepository",
  SmsRepository
)

