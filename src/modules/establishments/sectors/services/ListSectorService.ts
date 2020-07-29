import { inject, injectable } from "tsyringe";
import Sector from "@establishments/sectors/infra/typeorm/entities/Sector";
import ISectorsRepository from "@establishments/sectors/repositories/ISectorsRepository";

@injectable()
class ListSectorService {
  constructor(
    @inject("SectorsRepository")
    private sectorsRepository: ISectorsRepository
  ) { }

  public async execute(): Promise<Sector[]> {
    const sectors = await this.sectorsRepository.findAll();

    return sectors;
  }
}

export default ListSectorService;
