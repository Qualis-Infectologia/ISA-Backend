import { inject, injectable } from 'tsyringe';

import AppError from '@errors/AppError';
import IRolesRepository from '../repositories/IRolesRepository';
import IResourcesRepository from '@security/resources/repositories/IResourcesRepository';
import Role from '../infra/typeorm/entities/Role';
import Resource from '@security/resources/infra/typeorm/entities/Resource';

interface Request {
  id: string;
  name: string;
  resources: Resource[] | string[];
}

@injectable()
class UpdateRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
    @inject('ResourcesRepository')
    private resourcesRepository: IResourcesRepository,
  ) {}

  public async execute({ id, name, resources }: Request): Promise<Role> {
    const oldRole = await this.rolesRepository.findById(id);

    if (!oldRole) {
      throw new AppError('Perfil não encontrado', 404);
    }

    if (oldRole.name !== name) {
      const checkNameExists = await this.rolesRepository.findByName(name);

      if (checkNameExists) {
        throw new AppError('Nome já utilizado', 400);
      }

      oldRole.name = name;
    }

    if (resources) {
      if (resources[0] instanceof Object) {
        //@ts-ignore
        oldRole.resources = resources;
      } else {
        let allResources: Resource[] = [];
        for (const res of resources) {
          //@ts-ignore
          const resource = await this.resourcesRepository.findById(res);

          if (!resource) {
            throw new AppError('Recurso não encontrado', 404);
          }
          allResources.push(resource);
        }
        oldRole.resources = allResources;
      }
    }
    await this.rolesRepository.save(oldRole);
    return oldRole;
  }
}

export default UpdateRoleService;
