import { inject, injectable } from 'tsyringe';

import AppError from '@errors/AppError';
import IEstablishmentsRepository from '@establishments/repositories/IEstablishmentsRepository';
import ISectorsRepository from '../repositories/ISectorsRepository';
import Sector from '../infra/typeorm/entities/Sector';

interface Request {
  name: string;
  establishmentId: string;
}

@injectable()
class CreateSectorService {
  constructor(
    @inject('SectorsRepository')
    private sectorsRepository: ISectorsRepository,
    @inject('EstablishmentsRepository')
    private establishmentsRepository: IEstablishmentsRepository,
  ) {}

  public async execute({ name, establishmentId }: Request): Promise<Sector> {
    const establishment = await this.establishmentsRepository.findById(
      establishmentId,
    );

    if (!establishment) {
      throw new AppError('Estabelecimento não encontrado', 400);
    }

    const checkNameAlreadyUsed = await this.sectorsRepository.findByEstablishmentByName(
      name,
      establishmentId,
    );

    if (checkNameAlreadyUsed) {
      throw new AppError('Nome já utilizado', 401);
    }

    const sector = await this.sectorsRepository.create({
      name,
      establishment,
    });

    return sector;
  }
}

export default CreateSectorService;
