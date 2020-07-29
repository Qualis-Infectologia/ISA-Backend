import { getRepository, Repository, Not } from 'typeorm';
import ILocationsRepository from '@establishments/sectors/locations/repositories/ILocationsRepository';
import Location from '../entities/Location';
import ICreateLocationDTO from '@establishments/sectors/locations/dtos/ICreateLocationDTO';

class LocationsRepository implements ILocationsRepository {
  private ormRepository: Repository<Location>;

  constructor() {
    this.ormRepository = getRepository(Location);
  }

  public async create(data: ICreateLocationDTO): Promise<Location> {
    const location = this.ormRepository.create(data);

    await this.ormRepository.save(location);

    return location;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async findBySectorByName(
    name: string,
    sectorId: string,
  ): Promise<Location | undefined> {
    const location = await this.ormRepository.findOne({
      where: { name, sectorId },
    });

    return location;
  }

  public async findById(id: string): Promise<Location | undefined> {
    const location = await this.ormRepository.findOne({
      where: { id },
      relations: ['baselines'],
    });

    return location;
  }

  public async findByName(name: string): Promise<Location | undefined> {
    const location = await this.ormRepository.findOne({
      where: { name },
      relations: ['sector'],
    });

    return location;
  }

  public async findAll(): Promise<Location[] | undefined> {
    const location = await this.ormRepository.find({
      relations: ['sector'],
    });

    return location;
  }

  public async save(location: Location): Promise<Location> {
    return await this.ormRepository.save(location);
  }
}

export default LocationsRepository;
