import { Response, Request } from 'express';
import { container } from 'tsyringe';

import CreateBaselineService from '@users/baselines/services/CreateBaselineService';
import ShowBaselineService from '@users/baselines/services/ShowBaselineService';

class BaselineController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      age,
      genre,
      race,
      weight,
      height,
      city,
      recent_appointments,
      contact_covid19,
      mask,
      occupation,
      locationId,
      hypertension,
      diabetes,
      heart_disease,
      lung_disease,
      asthma,
      smoking,
      kidney_disease,
      cancer,
      corticosteroids_or_methotrexate,
      gestation,
    } = request.body;

    // @ts-ignore
    const userId = req.kauth.grant.access_token.content.sub;

    const createBaselineService = container.resolve(CreateBaselineService);

    const baseline = await createBaselineService.execute({
      userId,
      age,
      genre,
      race,
      weight,
      height,
      city,
      recent_appointments,
      contact_covid19,
      mask,
      occupation,
      locationId,
      hypertension,
      diabetes,
      heart_disease,
      lung_disease,
      asthma,
      smoking,
      kidney_disease,
      cancer,
      corticosteroids_or_methotrexate,
      gestation,
    });

    return response.status(201).json(baseline);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showBaselineService = container.resolve(ShowBaselineService);

    const baseline = await showBaselineService.execute(id);

    return response.status(200).json(baseline);
  }
}

export default new BaselineController();
