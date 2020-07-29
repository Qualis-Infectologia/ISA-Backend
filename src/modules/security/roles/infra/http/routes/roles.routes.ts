import { Router } from 'express';

import RolesController from '../controllers/RolesController';
import RolesValidator from '../../validators/RolesValidator';
import KeycloakConfig from '@shared/keycloak/keycloak-config';

const rolesRouter = Router();
const keycloak = KeycloakConfig.getKeycloak();

rolesRouter.post(
  '/',
  keycloak.protect('realm:admin'),
  RolesValidator.create,
  RolesController.create,
);
rolesRouter.get('/:id', keycloak.protect('realm:admin'), RolesController.show);
rolesRouter.get('/', keycloak.protect('realm:admin'), RolesController.index);
export default rolesRouter;
