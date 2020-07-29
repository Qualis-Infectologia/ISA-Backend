import { Router } from 'express';
import statisticTypesRouter from '@establishments/statistics/statistic-types/infra/http/routes/statisticTypes.routes';
import StatisticsController from '../controllers/StatisticsController';
import KeycloakConfig from '@shared/keycloak/keycloak-config';

const statisticsRouter = Router();
const keycloak = KeycloakConfig.getKeycloak();

statisticsRouter.get('/index', StatisticsController.index);
statisticsRouter.get('/show:id', StatisticsController.show);
statisticsRouter.use('/types', statisticTypesRouter);

export default statisticsRouter;
