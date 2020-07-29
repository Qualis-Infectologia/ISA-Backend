import Role from '../infra/typeorm/entities/Role';
import ICreateRoleDTO from '../dtos/ICreateRoleDTO';

export default interface IRolesRepository {
    create(data: ICreateRoleDTO): Promise<Role>;
    delete(id: string): Promise<void>;
    findByName(name: string): Promise<Role | undefined>;
    findById(id: string): Promise<Role | undefined>;
    findAll(): Promise<Role[]>;
    save(role: Role): Promise<Role>;
}
