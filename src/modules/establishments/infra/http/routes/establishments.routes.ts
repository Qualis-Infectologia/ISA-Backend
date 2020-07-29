import { Router } from 'express';
import EstablishmentsController from '../controllers/EstablishmentsController';
import EstablishmentsValidator from '@establishments/infra/validators/EstablishmentsValidator';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ensureRole from '@shared/infra/http/middlewares/ensureRole';
import establishmentsGraphicsRouter from '@establishments/infra/http/routes/establishmentsGraphics.routes';
import statisticsRouter from '@establishments/statistics/infra/http/routes/statistics.routes';
import establishmentsUserRouter from './establishmentsUsers.routes';
import sectorsRouter from '@establishments/sectors/infra/http/routes/sectors.routes';

const establishmentsRouter = Router();

establishmentsRouter.use(ensureAuthenticated);
establishmentsRouter.post(
  '/create',
  ensureRole('Administrador'),
  EstablishmentsValidator.create,
  EstablishmentsController.create,
);
establishmentsRouter.put(
  '/',
  ensureRole('Administrador'),
  EstablishmentsValidator.update,
  EstablishmentsController.update,
);
establishmentsRouter.get(
  '/show/:id',
  ensureRole('Administrador'),
  EstablishmentsController.show,
);
establishmentsRouter.get(
  '/index',
  ensureRole('Administrador'),
  EstablishmentsController.index,
);
establishmentsRouter.delete(
  '/:id',
  ensureAuthenticated,
  ensureRole('Administrador'),
  EstablishmentsController.delete,
);
establishmentsRouter.use('/graphics', establishmentsGraphicsRouter);
establishmentsRouter.use('/statistics', statisticsRouter);
establishmentsRouter.use('/users', establishmentsUserRouter);
establishmentsRouter.use('/sectors', sectorsRouter);

export default establishmentsRouter;
