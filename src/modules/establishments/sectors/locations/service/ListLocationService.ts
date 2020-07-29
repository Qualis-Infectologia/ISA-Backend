import { inject, injectable } from "tsyringe";
import Location from "@establishments/sectors/locations/infra/typeorm/entities/Location";
import ILocationsRepository from "@establishments/sectors/locations/repositories/ILocationsRepository";

@injectable()
class ListLocationService {
  constructor(
    @inject("LocationsRepository")
    private locationsRepository: ILocationsRepository
  ) { }

  public async execute(): Promise<Location[] | undefined> {
    const locations = await this.locationsRepository.findAll();

    return locations;
  }
}

export default ListLocationService;
