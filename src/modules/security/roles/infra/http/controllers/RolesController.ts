import { Response, Request } from 'express';
import { container } from 'tsyringe';
import CreateRoleService from '@security/roles/services/CreateRoleService';
import ShowRoleService from '@security/roles/services/ShowRoleService';
import ListRolesService from '@security/roles/services/ListRolesService';
import DeleteRoleService from '@security/roles/services/DeleteRoleService';
import UpdateRoleService from '@security/roles/services/UpdateRoleService';

class RolesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listRolesService = container.resolve(ListRolesService);

    const roles = await listRolesService.execute();

    return response.status(200).json(roles);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, resources } = request.body;

    const createRoleService = container.resolve(CreateRoleService);

    const role = await createRoleService.execute({
      name,
      resources,
    });

    return response.status(201).json(role);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id, name, resources } = request.body;

    // @ts-ignore
    const updateRoleService = container.resolve(UpdateRoleService);

    const roleUpdated = await updateRoleService.execute({
      id,
      name,
      resources,
    });

    return response.status(200).json(roleUpdated);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showRoleService = container.resolve(ShowRoleService);

    const role = await showRoleService.execute(id);

    return response.status(200).json(role);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteRoleService = container.resolve(DeleteRoleService);

    await deleteRoleService.execute(id);

    return response.status(200).json();
  }
}

export default new RolesController();
