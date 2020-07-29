import { inject, injectable } from 'tsyringe';

import SectorType from '../infra/typeorm/entities/Sector';
import ISectorRepository from '../repositories/ISectorsRepository';
import AppError from '@shared/errors/AppError';
import IEstablishmentsRepository from '@establishments/repositories/IEstablishmentsRepository';

interface Request {
  id: string;
  name: string;
  establishmentId: string;
}

@injectable()
class UpdateSectorService {
  constructor(
    @inject('EstablishmentsRepository')
    private establishmentsRepository: IEstablishmentsRepository,
    @inject('SectorsRepository')
    private sectorRepository: ISectorRepository,
  ) {}

  public async execute({ id, name, establishmentId }: Request): Promise<SectorType> {
    const oldSector = await this.sectorRepository.findById(id);

    if (!oldSector) {
      throw new AppError('Setor não encontrado', 404);
    }

    if (oldSector.name !== name) {
      const checkNameUsed = await this.sectorRepository.findByName(name);

      if (checkNameUsed) {
        throw new AppError('Nome já utilizado', 400);
      }
      oldSector.name = name;
    }

    if (establishmentId) {
      const establishment = await this.establishmentsRepository.findById(establishmentId);

      if (!establishment) {
        throw new AppError('Estabelecimento não encontrado', 404);
      }

      oldSector.establishment = establishment;
    }

    await this.sectorRepository.save(oldSector);
    return oldSector;
  }
}

export default UpdateSectorService;
