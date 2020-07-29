import { getRepository, Repository, Not } from 'typeorm';
import ISectorsRepository from '@establishments/sectors/repositories/ISectorsRepository';
import Sector from '../entities/Sector';
import ICreateSectorDTO from '@establishments/sectors/dtos/ICreateSectorDTO';

class SectorsRepository implements ISectorsRepository {
  private ormRepository: Repository<Sector>;

  constructor() {
    this.ormRepository = getRepository(Sector);
  }

  public async create(data: ICreateSectorDTO): Promise<Sector> {
    const sector = this.ormRepository.create(data);

    await this.ormRepository.save(sector);

    return sector;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async findByEstablishmentByName(
    name: string,
    establishmentId: string,
  ): Promise<Sector | undefined> {
    const sector = await this.ormRepository.findOne({
      where: { name, establishmentId },
    });

    return sector;
  }

  public async findById(id: string): Promise<Sector | undefined> {
    const sector = await this.ormRepository.findOne({
      where: { id },
      relations: ['locations'],
    });

    return sector;
  }

  public async findByName(name: string): Promise<Sector | undefined> {
    const sector = await this.ormRepository.findOne({ where: { name } });

    return sector;
  }


  public async findAll(): Promise<Sector[]> {
    const sectors = await this.ormRepository.find({
      relations: ['establishment'],
    });

    return sectors;
  }

  public async save(sector: Sector): Promise<Sector> {
    return await this.ormRepository.save(sector);
  }
}

export default SectorsRepository;
