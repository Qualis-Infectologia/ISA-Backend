import { getRepository, Repository, Not } from 'typeorm';
import IEstablishmentsRepository from '@establishments/repositories/IEstablishmentsRepository';
import Establishment from '../entities/Establishment';
import ICreateEstablishmentsDTO from '@establishments/dtos/ICreateEstablishmentsDTO';

class EstablishmentsRepository implements IEstablishmentsRepository {
  private ormRepository: Repository<Establishment>;

  constructor() {
    this.ormRepository = getRepository(Establishment);
  }

  public async create(data: ICreateEstablishmentsDTO): Promise<Establishment> {
    const establishment = this.ormRepository.create(data);

    await this.ormRepository.save(establishment);

    return establishment;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async findByName(name: string): Promise<Establishment | undefined> {
    const establishment = await this.ormRepository.findOne({ where: { name } });

    return establishment;
  }

  public async findByCnpj(cnpj: string): Promise<Establishment | undefined> {
    const establishment = await this.ormRepository.findOne({ where: { cnpj } });

    return establishment;
  }

  public async findAll(): Promise<Establishment[]> {
    const establishments = await this.ormRepository.find();

    return establishments;
  }

  public async findAllWithUsers(): Promise<Establishment[]> {
    const establishments = await this.ormRepository.find({
      relations: ['users'],
    });

    return establishments;
  }

  public async findAllWithSectors(): Promise<Establishment[]> {
    const establishments = await this.ormRepository.find({
      relations: ['sectors', 'sectors.locations'],
    });

    return establishments;
  }

  public async findById(id: string): Promise<Establishment | undefined> {
    const establishment = await this.ormRepository.findOne({
      where: { id },
      relations: ['users', 'sectors'],
    });

    return establishment;
  }

  public async save(establishment: Establishment): Promise<Establishment> {
    return await this.ormRepository.save(establishment);
  }
}

export default EstablishmentsRepository;
