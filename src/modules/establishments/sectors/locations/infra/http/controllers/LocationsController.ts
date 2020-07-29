import { Response, Request } from 'express';
import { container } from 'tsyringe';
import CreateLocationService from '@establishments/sectors/locations/service/CreateLocationService';
import ListLocationService from '@establishments/sectors/locations/service/ListLocationService';
import UpdateLocationService from '@establishments/sectors/locations/service/UpdateLocationService';
import DeleteLocationService from '@establishments/sectors/locations/service/DeleteLocationService';

class LocationsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, sectorId } = request.body;

    const createLocationService = container.resolve(CreateLocationService);

    const location = await createLocationService.execute({
      name,
      sectorId,
    });

    return response.status(201).json(location);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id, name, sectorId } = request.body;

    const updateLocationService = container.resolve(UpdateLocationService);

    const location = await updateLocationService.execute({
      id,
      name,
      sectorId,
    });

    return response.status(200).json(location);
  }

  public async delete (
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const deleteLocationService = container.resolve(
      DeleteLocationService,
    );

    await deleteLocationService.execute(id);

    return response.status(200).json();
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listLocationServices = container.resolve(ListLocationService);

    const location = await listLocationServices.execute();

    return response.status(200).json(location);
  }
}

export default new LocationsController();
