import { inject, injectable } from 'tsyringe';

import AppError from '@errors/AppError';
import IResourcesRepository from '@security/resources/repositories/IResourcesRepository';
import Resource from '../infra/typeorm/entities/Resource';

interface Request {
  id: string;
  name: string;
  to: string;
  icon: string;
}

@injectable()
class UpdateResourceService {
  constructor(
    @inject('ResourcesRepository')
    private resourcesRepository: IResourcesRepository,
  ) {}

  public async execute({ id, name, to, icon }: Request): Promise<Resource> {
    const oldResource = await this.resourcesRepository.findById(id);

    if (!oldResource) {
      throw new AppError('Recurso não encontrado', 404);
    }

    if (oldResource.to !== to) {
      const checkUsernameExists = await this.resourcesRepository.findByTo(to);

      if (checkUsernameExists) {
        throw new AppError('Caminho já utilizado', 400);
      }

      oldResource.to = to;
    }

    if (oldResource.name !== name) {
      const checkNameUsed = await this.resourcesRepository.findByName(name);

      if (checkNameUsed) {
        throw new AppError('Nome já utilizado', 400);
      }

      oldResource.name = name;
    }

    if (oldResource.icon !== icon) {
      oldResource.icon = icon;
    }

    await this.resourcesRepository.save(oldResource);
    return oldResource;
  }
}

export default UpdateResourceService;
