import { Response, Request } from 'express';
import { container } from 'tsyringe';
import CreateEvaluationService from '@users/evaluations/services/CreateEvaluationsService';
import ShowEvaluationsService from '@users/evaluations/services/ShowEvaluationsService';

class EvaluationsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { userId, liberate, days, annotation, diaryId } = request.body;
    // @ts-ignore
    const user = request.user;

    const createEvaluationService = container.resolve(CreateEvaluationService);

    const evaluation = await createEvaluationService.execute({
      userId,
      liberate,
      days,
      annotation,
      diaryId,
      infecto: user,
    });

    return response.status(201).json(evaluation);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showEvaluationService = container.resolve(ShowEvaluationsService);

    const evaluation = await showEvaluationService.execute(id);

    return response.status(200).json(evaluation);
  }
}

export default new EvaluationsController();
