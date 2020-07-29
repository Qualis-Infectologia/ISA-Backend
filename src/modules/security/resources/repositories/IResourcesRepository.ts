import ICreateResourceDTO from "../dtos/ICreateResourceDTO";
import Resource from "../infra/typeorm/entities/Resource";

export default interface IResourcesRepository {
  create(data: ICreateResourceDTO): Promise<Resource>;
  delete(id: string): Promise<void>;
  findByName(name: string): Promise<Resource | undefined>;
  findByTo(to: string): Promise<Resource | undefined>;
  findById(id: string): Promise<Resource | undefined>;
  findAll(): Promise<Resource[]>;
  save(resource: Resource): Promise<Resource>;
}
