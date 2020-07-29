import { Router } from 'express';

import UsersValidator from '@modules/users/infra/validators/UsersValidator';
import UsersController from '@modules/users/infra/http/controllers/UsersController';
import baselinesRouter from '@users/baselines/infra/http/routes/baselines.routes';
import diariesRouter from '@users/diaries/infra/http/routes/diaries.routes';
import tokensRouter from '@users/tokens/infra/http/routes/tokens.routes';
import evaluationsRouter from '@users/evaluations/infra/http/routes/evaluations.routes';
import KeycloakConfig from '@shared/keycloak/keycloak-config';

const usersRouter = Router();
const keycloak = KeycloakConfig.getKeycloak();

usersRouter.post('/', UsersValidator.create, UsersController.create);

usersRouter.get(
  '/under-evaluation',
  keycloak.protect('realm:admin'),
  UsersController.statusUnderEvaluation,
);
usersRouter.get(
  '/user/:id',
  keycloak.protect('realm:admin'),
  UsersController.show,
);
usersRouter.get(
  '/for-evaluation/:id',
  keycloak.protect('realm:admin'),
  UsersController.showForEvaluations,
);

usersRouter.get(
  '/count/under-evaluation',
  keycloak.protect('realm:admin'),
  UsersController.countUnderEvaluation,
);
usersRouter.get('/', keycloak.protect('realm:admin'), UsersController.index);

usersRouter.get(
  '/roles',
  keycloak.protect('realm:admin'),
  UsersController.indexRoles,
);
usersRouter.post(
  '/addRole',
  keycloak.protect('realm:admin'),
  UsersController.addRoleForUser,
);
usersRouter.delete(
  '/removeRole',
  keycloak.protect('realm:admin'),
  UsersController.removeRoleFromUser,
);
usersRouter.get(
  '/roleUsers',
  keycloak.protect('realm:admin'),
  UsersController.usersFromRole,
);

usersRouter.use('/baselines', baselinesRouter);
usersRouter.use('/diaries', diariesRouter);
usersRouter.use('/evaluations', evaluationsRouter);
usersRouter.use('/tokens', tokensRouter);

export default usersRouter;
