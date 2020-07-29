import { inject, injectable } from "tsyringe";

import AppError from "@errors/AppError";
import IEstablishmentsRepository from "@establishments/repositories/IEstablishmentsRepository";

@injectable()
class DeleteEstablishmentService {
  constructor(
    @inject("EstablishmentsRepository")
    private establishmentsRepository: IEstablishmentsRepository
  ) { }

  public async execute(id: string): Promise<void> {
    const establishment = await this.establishmentsRepository.findById(id);

    if (!establishment) {
      throw new AppError("Estabelecimento não encontrado", 404);
    }

    await this.establishmentsRepository.delete(id);
  }
}

export default DeleteEstablishmentService;
