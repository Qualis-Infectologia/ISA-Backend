import { inject, injectable } from "tsyringe";
import ISectorRepository from "../repositories/ISectorsRepository";
import AppError from "@shared/errors/AppError";

@injectable()
class DeleteSectorService {
  constructor(
    @inject("SectorsRepository")
    private sectorsRepository: ISectorRepository
  ) { }

  public async execute(id: string): Promise<void> {
    const sector = await this.sectorsRepository.findById(id);

    if (!sector) {
      throw new AppError("Setor não encontrado", 404);
    }

    await this.sectorsRepository.delete(id);
  }
}

export default DeleteSectorService;
