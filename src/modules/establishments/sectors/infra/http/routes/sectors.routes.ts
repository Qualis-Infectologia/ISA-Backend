import { Router } from 'express';
import ensureRole from '@shared/infra/http/middlewares/ensureRole';
import SectorController from '../controllers/SectorsController';
import locationsRouter from '@establishments/sectors/locations/infra/http/routes/locations.routes';
import SectorsValidator from '../../validators/SectorsValidator';

const sectorsRouter = Router();

sectorsRouter.get("/index", SectorController.index);
sectorsRouter.delete(
  '/:id',
  ensureRole('Administrador'),
  SectorController.delete,
);
sectorsRouter.post(
  '/create',
  ensureRole('Administrador'),
  SectorsValidator.create,
  SectorController.create,
);
sectorsRouter.put(
  '/',
  ensureRole('Administrador'),
  SectorsValidator.update,
  SectorController.update,
);

sectorsRouter.use('/locations/', locationsRouter);
export default sectorsRouter;
