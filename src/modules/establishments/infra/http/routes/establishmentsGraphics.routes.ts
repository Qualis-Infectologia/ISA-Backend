import { Router } from 'express';

import ensureEstablishment from '@shared/infra/http/middlewares/ensureEstablishment';
import EstablishmentGraphicsController from '../controllers/EstablishmentGraphicsController';

const establishmentsGraphicsRouter = Router();

establishmentsGraphicsRouter.get(
  '/approved-not-approved/:startDate/:endDate',
  ensureEstablishment,
  EstablishmentGraphicsController.approvedNotApproved,
);

establishmentsGraphicsRouter.get(
  '/accession/:startDate/:endDate',
  ensureEstablishment,
  EstablishmentGraphicsController.accession,
);

establishmentsGraphicsRouter.get(
  '/symptoms',
  ensureEstablishment,
  EstablishmentGraphicsController.symptoms,
);

establishmentsGraphicsRouter.get(
  '/users-symptomatic',
  ensureEstablishment,
  EstablishmentGraphicsController.usersSymptomatic,
);

establishmentsGraphicsRouter.get(
  '/users-accession',
  ensureEstablishment,
  EstablishmentGraphicsController.usersAccession,
);

establishmentsGraphicsRouter.get(
  '/users-approved',
  ensureEstablishment,
  EstablishmentGraphicsController.usersApproved,
);

establishmentsGraphicsRouter.get(
  '/users-not-approved',
  ensureEstablishment,
  EstablishmentGraphicsController.usersNotApproved,
);

establishmentsGraphicsRouter.get(
  '/number-users',
  ensureEstablishment,
  EstablishmentGraphicsController.usersNumber,
);

establishmentsGraphicsRouter.get(
  '/symptom-diaries',
  ensureEstablishment,
  EstablishmentGraphicsController.symptomDiaries,
);

establishmentsGraphicsRouter.get(
  '/symptomatic-local',
  ensureEstablishment,
  EstablishmentGraphicsController.symptomaticLocal,
);

export default establishmentsGraphicsRouter;
