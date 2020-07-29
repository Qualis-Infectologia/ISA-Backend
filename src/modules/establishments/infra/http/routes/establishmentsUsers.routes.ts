import { Router } from 'express';

import EstablishmentUsersController from '../controllers/EstablishmentUsersController';
import ensureEstablishment from '@shared/infra/http/middlewares/ensureEstablishment';

const establishmentsUserRouter = Router();

establishmentsUserRouter.get(
  '/diary/:date',
  ensureEstablishment,
  EstablishmentUsersController.diary,
);

export default establishmentsUserRouter;
