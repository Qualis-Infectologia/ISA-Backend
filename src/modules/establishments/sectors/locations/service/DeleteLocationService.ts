import { inject, injectable } from "tsyringe";
import ILocationRepository from "../repositories/ILocationsRepository";
import AppError from "@shared/errors/AppError";

@injectable()
class DeleteLocationService {
  constructor(
    @inject("LocationsRepository")
    private locationsRepository: ILocationRepository
  ) { }

  public async execute(id: string): Promise<void> {
    const location = await this.locationsRepository.findById(id);

    if (!location) {
      throw new AppError("Localização não encontrada", 404);
    }

    await this.locationsRepository.delete(id);
  }
}

export default DeleteLocationService;
