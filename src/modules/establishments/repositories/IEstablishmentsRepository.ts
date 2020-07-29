import Establishment from '@establishments/infra/typeorm/entities/Establishment';
import ICreateEstablishmentsDTO from '@establishments/dtos/ICreateEstablishmentsDTO';

export default interface IEstablishmentsRepository {
  create(data: ICreateEstablishmentsDTO): Promise<Establishment>;
  delete(id: string): Promise<void>;
  findByName(name: string): Promise<Establishment | undefined>;
  findByCnpj(cnpj: string): Promise<Establishment | undefined>;
  findById(id: string): Promise<Establishment | undefined>;
  findAll(): Promise<Establishment[]>;
  findAllWithUsers(): Promise<Establishment[]>;
  findAllWithSectors(): Promise<Establishment[]>;
  save(establishment: Establishment): Promise<Establishment>;
}
