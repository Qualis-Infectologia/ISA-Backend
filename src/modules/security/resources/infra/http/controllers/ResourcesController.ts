import { Response, Request } from 'express';
import { container } from 'tsyringe';
import CreateResourceService from '@security/resources/services/CreateResourceService';
import ShowResourceService from '@security/resources/services/ShowResourceService';
import ListResourcesService from '@security/resources/services/ListResourcesService';
import DeleteResourceService from '@security/resources/services/DeleteResourceService';
import UpdateResourceService from '@security/resources/services/UpdateResourceService';

class ResourcesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, to, icon } = request.body;

    const createResourceService = container.resolve(CreateResourceService);

    const resource = await createResourceService.execute({
      name,
      to,
      icon,
    });

    return response.status(201).json(resource);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id, name, to, icon } = request.body;

    // @ts-ignore
    const updateResourceService = container.resolve(UpdateResourceService);

    const resourceUpdated = await updateResourceService.execute({
      id,
      name,
      to,
      icon,
    });

    return response.status(200).json(resourceUpdated);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showResourceService = container.resolve(ShowResourceService);

    const resource = await showResourceService.execute(id);

    return response.status(200).json(resource);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listResourcesService = container.resolve(ListResourcesService);

    const resources = await listResourcesService.execute();

    return response.status(200).json(resources);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteResourceService = container.resolve(DeleteResourceService);

    await deleteResourceService.execute(id);

    return response.status(200).json();
  }
}

export default new ResourcesController();
