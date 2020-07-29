import { inject, injectable } from 'tsyringe';

import LocationType from '../infra/typeorm/entities/Location';
import ILocationRepository from '@establishments/sectors/locations/repositories/ILocationsRepository';
import AppError from '@shared/errors/AppError';
import ISectorsRepository from '@establishments/sectors/repositories/ISectorsRepository';

interface Request {
  id: string;
  name: string;
  sectorId: string;
}

@injectable()
class UpdateLocationService {
  constructor(
    @inject('SectorsRepository')
    private sectorsRepository: ISectorsRepository,
    @inject('LocationsRepository')
    private locationRepository: ILocationRepository,
  ) {}

  public async execute({ id, name, sectorId }: Request): Promise<LocationType> {
    const oldLocation = await this.locationRepository.findById(id);

    if (!oldLocation) {
      throw new AppError('Localização não encontrada', 404);
    }

    if (oldLocation.name !== name) {
      const checkNameUsed = await this.locationRepository.findByName(name);

      if (checkNameUsed) {
        throw new AppError('Nome já utilizado', 400);
      }
      oldLocation.name = name;
    }

    if (sectorId) {
      const sector = await this.sectorsRepository.findById(sectorId);

      if (!sector) {
        throw new AppError('Estabelecimento não encontrado', 404);
      }

      oldLocation.sector = sector;
    }

    await this.locationRepository.save(oldLocation);
    return oldLocation;
  }
}

export default UpdateLocationService;
