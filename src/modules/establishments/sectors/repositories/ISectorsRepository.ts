import Sector from '../infra/typeorm/entities/Sector';
import ICreateSectorDTO from '../dtos/ICreateSectorDTO';

export default interface ISectorsRepository {
  create(data: ICreateSectorDTO): Promise<Sector>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Sector | undefined>;
  findByName(name: string): Promise<Sector | undefined>;
  findAll(): Promise<Sector[]>;
  findByEstablishmentByName(
    name: string,
    establishmentId: string,
  ): Promise<Sector | undefined>;
  save(sector: Sector): Promise<Sector>;
}
