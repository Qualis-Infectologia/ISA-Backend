import { Response, Request } from 'express';
import { container } from 'tsyringe';
import CreateDiaryService from '@users/diaries/services/CreateDiaryService';
import ShowDiaryService from '@users/diaries/services/ShowDiaryService';
import ShowDiaryByDateByUserService from '@users/diaries/services/ShowDiaryByDateByUserService';
import ListEstablishmentsService from '@establishments/services/ListEstablishmentsService';

class DiariesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      smellLoss,
      tasteLoss,
      appetiteLoss,
      fatigue,
      fever,
      cough,
      diarrhea,
      delirium,
      soreThroat,
      shortnessOfBreath,
      nasalCongestion,
      headache,
    } = request.body;
    // @ts-ignore
    const userId = request.user.id;

    const establishmentService = container.resolve(ListEstablishmentsService);

    const establishment = await establishmentService.execute();

    const createDiaryService = container.resolve(CreateDiaryService);

    const diary = await createDiaryService.execute(
      {
        smellLoss,
        tasteLoss,
        appetiteLoss,
        fatigue,
        fever,
        cough,
        diarrhea,
        delirium,
        soreThroat,
        shortnessOfBreath,
        headache,
        nasalCongestion,
      },
      userId,
      establishment[0],
    );

    return response.status(201).json(diary);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showDiaryService = container.resolve(ShowDiaryService);

    const diary = await showDiaryService.execute(id);

    return response.status(200).json(diary);
  }

  public async showByDate(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { date } = request.params;

    // @ts-ignore
    const { id } = request.user;

    const showDiaryByDateByUserService = container.resolve(
      ShowDiaryByDateByUserService,
    );

    const diary = await showDiaryByDateByUserService.execute(date, id);

    return response.status(200).json(diary);
  }
}

export default new DiariesController();
