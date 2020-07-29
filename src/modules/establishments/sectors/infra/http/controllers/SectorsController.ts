import { Response, Request } from 'express';
import { container } from 'tsyringe';
import CreateSectorService from '@establishments/sectors/services/CreateSectorService';
import ListSectorService from '@establishments/sectors/services/ListSectorService';
import UpdateSectorService from '@establishments/sectors/services/UpdateSectorService';
import DeleteSectorService from '@establishments/sectors/services/DeleteSectorService';

class SectorController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, establishmentId } = request.body;

    const createSectorService = container.resolve(CreateSectorService);

    const sector = await createSectorService.execute({
      name,
      establishmentId,
    });

    return response.status(201).json(sector);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      id,
      name,
      establishmentId
    } = request.body;

    const updateSectorService = container.resolve(UpdateSectorService);

    const sectorUpdated = await updateSectorService.execute({
      id,
      name,
      establishmentId
    });

    return response.status(200).json(sectorUpdated);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listSectorServices = container.resolve(ListSectorService);

    const sector = await listSectorServices.execute();

    return response.status(200).json(sector);
  }

  public async delete (
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const deleteSectorService = container.resolve(
      DeleteSectorService,
    );

    await deleteSectorService.execute(id);

    return response.status(200).json();
  }
}

export default new SectorController();
