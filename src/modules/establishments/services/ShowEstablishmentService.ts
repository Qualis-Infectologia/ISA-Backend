import { inject, injectable } from "tsyringe";

import AppError from "@errors/AppError";
import IEstablishmentsRepository from "@establishments/repositories/IEstablishmentsRepository";
import Establishment from "@establishments/infra/typeorm/entities/Establishment";

@injectable()
class ShowEstablishmentService {
  constructor(
    @inject("EstablishmentsRepository")
    private establishmentsRepository: IEstablishmentsRepository
  ) { }

  public async execute(id: string): Promise<Establishment> {
    const establishment = await this.establishmentsRepository.findById(id);

    if (!establishment) {
      throw new AppError("Estabelecimento não encontrado", 404);
    }

    return establishment;
  }
}

export default ShowEstablishmentService;
