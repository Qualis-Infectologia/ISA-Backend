import { getRepository, Repository } from 'typeorm';
import IRolesRepository from '@security/roles/repositories/IRolesRepository';
import Role from '../entities/Role';
import ICreateRoleDTO from '@security/roles/dtos/ICreateRoleDTO';

class RolesRepository implements IRolesRepository {
    private ormRepository: Repository<Role>;

    constructor() {
      this.ormRepository = getRepository(Role);
    }

    public async create(data: ICreateRoleDTO): Promise<Role> {
        const role = this.ormRepository.create(data);

        await this.ormRepository.save(role);

        return role;
    }

    public async delete(id: string): Promise<void> {
      await this.ormRepository.delete(id);
    }

    public async findByName(name: string): Promise<Role | undefined> {
        const role = this.ormRepository.findOne({ where: { name } });

        return role;
    }

    public async findAll(): Promise<Role[]> {
        const roles = this.ormRepository.find({
          relations: ["resources"]
        });

        return roles;
    }

    public async findById(id: string): Promise<Role | undefined> {
        const role = this.ormRepository.findOne({
            where: { id },
            relations: ['resources'],
        });

        return role;
    }

    public async save(role: Role): Promise<Role> {
        return await this.ormRepository.save(role);
    }
}

export default RolesRepository;
