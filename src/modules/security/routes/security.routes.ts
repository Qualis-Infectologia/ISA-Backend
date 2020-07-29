import { Router } from 'express';

import resourcesRouter from '@security/resources/infra/http/routes/resources.routes';
import rolesRouter from '@security/roles/infra/http/routes/roles.routes';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ensureRole from '@shared/infra/http/middlewares/ensureRole';

const routes = Router();

routes.use(ensureAuthenticated);
routes.use(ensureRole('admin'));
routes.use('/resources', resourcesRouter);
routes.use('/roles', rolesRouter);

export default routes;
