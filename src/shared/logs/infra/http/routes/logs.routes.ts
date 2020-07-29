import { Router } from 'express';

import ensureRole from '@shared/infra/http/middlewares/ensureRole';
import LogsController from '../controllers/LogsController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
const logsRouter = Router();

logsRouter.use(ensureAuthenticated);
logsRouter.use(ensureRole('Administrador'));

logsRouter.get('/', LogsController.index);
export default logsRouter;
