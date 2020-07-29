import Location from '../infra/typeorm/entities/Location';
import ICreateLocationDTO from '../dtos/ICreateLocationDTO';

export default interface ILocationsRepository {
  create(data: ICreateLocationDTO): Promise<Location>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Location | undefined>;
  findAll(): Promise<Location[] | undefined>;
  findByName(name: string): Promise<Location | undefined>;
  findBySectorByName(
    name: string,
    sectorId: string,
  ): Promise<Location | undefined>;
  save(location: Location): Promise<Location>;
}
