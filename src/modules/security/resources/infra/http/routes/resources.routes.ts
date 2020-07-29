import { Router } from 'express';

import ResourcesController from '../controllers/ResourcesController';
import ResourcesValidator from '@security/resources/infra/validators/ResourcesValidator';
import KeycloakConfig from '@shared/keycloak/keycloak-config';

const resourcesRouter = Router();
const keycloak = KeycloakConfig.getKeycloak();

resourcesRouter.post(
  '/',
  keycloak.protect('realm:admin'),
  ResourcesValidator.create,
  ResourcesController.create,
);
resourcesRouter.get(
  '/:id',
  keycloak.protect('realm:admin'),
  ResourcesController.show,
);
resourcesRouter.get(
  '/',
  keycloak.protect('realm:admin'),
  ResourcesController.index,
);
export default resourcesRouter;
