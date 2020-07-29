import { getRepository, Repository } from "typeorm";
import IResourcesRepository from "@security/resources/repositories/IResourcesRepository";
import Resource from "../entities/Resource";
import ICreateResourceDTO from "@security/resources/dtos/ICreateResourceDTO";

class ResourcesRepository implements IResourcesRepository {
  private ormRepository: Repository<Resource>;

  constructor() {
    this.ormRepository = getRepository(Resource);
  }

  public async create(data: ICreateResourceDTO): Promise<Resource> {
    const resource = this.ormRepository.create(data);

    await this.ormRepository.save(resource);

    return resource;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async findByName(name: string): Promise<Resource | undefined> {
    const resource = this.ormRepository.findOne({ where: { name } });

    return resource;
  }

  public async findByTo(to: string): Promise<Resource | undefined> {
    const resource = this.ormRepository.findOne({ where: { to } });

    return resource;
  }

  public async findAll(): Promise<Resource[]> {
    const resources = this.ormRepository.find();

    return resources;
  }

  public async findById(id: string): Promise<Resource | undefined> {
    const resource = this.ormRepository.findOne({
      where: { id },
    });

    return resource;
  }

  public async save(resource: Resource): Promise<Resource> {
    return await this.ormRepository.save(resource);
  }
}

export default ResourcesRepository;
