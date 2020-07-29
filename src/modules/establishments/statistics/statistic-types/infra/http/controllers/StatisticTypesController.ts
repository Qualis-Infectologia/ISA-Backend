import { Response, Request } from "express";
import { container } from "tsyringe";
import CreateStatisticTypeService from "@establishments/statistics/statistic-types/services/CreateStatisticTypeService";
import ListStatisticTypesService from "@establishments/statistics/statistic-types/services/ListStatisticTypesService";
import UpdateStatisticTypeService from "@establishments/statistics/statistic-types/services/UpdateStatisticTypeService";
import ShowStatisticTypeService from "@establishments/statistics/statistic-types/services/ShowStatisticTypeService";
import DeleteStatisticTypeService from "@establishments/statistics/statistic-types/services/DeleteStatisticTypeService";

class StatisticTypesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createStatisticTypeService = container.resolve(
      CreateStatisticTypeService
    );

    const statisticType = await createStatisticTypeService.execute({
      name,
    });

    return response.status(201).json(statisticType);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id, name } = request.body;

    // @ts-ignore
    const updateTypeStatisticService = container.resolve(UpdateStatisticTypeService);

    const userUpdated = await updateTypeStatisticService.execute({
      id,
      name
    });

    return response.status(200).json(userUpdated);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showStatisticTypeService = container.resolve(
      ShowStatisticTypeService
    );

    const statisticType = await showStatisticTypeService.execute(id);

    return response.status(200).json(statisticType);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listStatisticTypesService = container.resolve(
      ListStatisticTypesService
    );

    const statisticTypes = await listStatisticTypesService.execute();

    return response.status(200).json(statisticTypes);
  }

  public async delete (
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const deleteStatisticTypeService = container.resolve(
      DeleteStatisticTypeService,
    );

    await deleteStatisticTypeService.execute(id);

    return response.status(200).json();
  }
}

export default new StatisticTypesController();
