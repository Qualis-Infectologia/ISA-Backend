import { Router } from 'express';
import ensureRole from '@shared/infra/http/middlewares/ensureRole';
import LocationsController from '@establishments/sectors/locations/infra/http/controllers/LocationsController';
import LocationsValidator from '../../validators/LocationsValidator';

const locationsRouter = Router();

locationsRouter.get(
  '/index',
  ensureRole('Administrador'),
  LocationsController.index,
);
locationsRouter.delete(
  '/:id',
  ensureRole('Administrador'),
  LocationsController.delete,
);
locationsRouter.put(
  '/',
  ensureRole('Administrador'),
  LocationsController.update,
  LocationsValidator.update,
);
locationsRouter.post(
  '/create',
  ensureRole('Administrador'),
  LocationsValidator.create,
  LocationsController.create,
);
export default locationsRouter;
