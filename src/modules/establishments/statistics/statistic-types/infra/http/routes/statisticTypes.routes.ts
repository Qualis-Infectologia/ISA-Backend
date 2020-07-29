import { Router } from 'express';
import StatisticTypeValidator from '../../validators/StatisticTypeValidator';
import StatisticTypesController from '../controllers/StatisticTypesController';
import KeycloakConfig from '@shared/keycloak/keycloak-config';

const statisticTypesRouter = Router();

const keycloak = KeycloakConfig.getKeycloak();

statisticTypesRouter.post(
  '/create',
  keycloak.protect('realm:admin'),
  StatisticTypeValidator.create,
  StatisticTypesController.create,
);
statisticTypesRouter.put(
  '/',
  keycloak.protect('realm:admin'),
  StatisticTypeValidator.update,
  StatisticTypesController.update,
);
statisticTypesRouter.get(
  '/show/:id',
  keycloak.protect('realm:admin'),
  StatisticTypesController.show,
);
statisticTypesRouter.get(
  '/index',
  keycloak.protect('realm:admin'),
  StatisticTypesController.index,
);

export default statisticTypesRouter;
