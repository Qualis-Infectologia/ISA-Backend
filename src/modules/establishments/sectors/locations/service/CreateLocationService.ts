import { inject, injectable } from 'tsyringe';

import AppError from '@errors/AppError';
import ILocationsRepository from '../repositories/ILocationsRepository';
import ISectorsRepository from '@establishments/sectors/repositories/ISectorsRepository';
import Location from '../infra/typeorm/entities/Location';

interface Request {
  name: string;
  sectorId: string;
}

@injectable()
class CreateLocationService {
  constructor(
    @inject('SectorsRepository')
    private sectorsRepository: ISectorsRepository,
    @inject('LocationsRepository')
    private locationsRepository: ILocationsRepository,
  ) {}

  public async execute({ name, sectorId }: Request): Promise<Location> {
    const sector = await this.sectorsRepository.findById(sectorId);

    if (!sector) {
      throw new AppError('Setor não encontrado', 400);
    }

    const checkNameAlreadyUsed = await this.locationsRepository.findBySectorByName(
      name,
      sectorId,
    );

    if (checkNameAlreadyUsed) {
      throw new AppError('Nome já utilizado', 401);
    }

    const location = await this.locationsRepository.create({
      name,
      sector,
    });

    return location;
  }
}

export default CreateLocationService;
