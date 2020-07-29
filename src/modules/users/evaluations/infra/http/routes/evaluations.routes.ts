import { Router } from 'express';

import ensureResource from '@shared/infra/http/middlewares/ensureResource';
import EvaluationsController from '../controllers/EvaluationsController';
import EvaluationsValidator from '../../validators/EvaluationsValidator';

const evaluationsRouter = Router();

evaluationsRouter.use(ensureResource('Avaliações'));
evaluationsRouter.post(
  '/',
  EvaluationsValidator.create,
  EvaluationsController.create,
);
evaluationsRouter.get('/:id', EvaluationsController.show);

export default evaluationsRouter;
