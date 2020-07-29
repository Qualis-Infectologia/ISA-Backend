import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import StatusEnum from '@users/enums/StatusEnum';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create(data: ICreateUserDTO) {
    const user = this.ormRepository.create(data);

    await this.ormRepository.save(user);

    return user;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id, {
      relations: [
        'baseline',
        'baseline.location',
        'establishments',
        'establishments.sectors',
        'establishments.sectors.locations',
        'role',
        'role.resources',
      ],
    });

    return user;
  }

  public async findByIdForEvaluations(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id, {
      relations: [
        'baseline',
        'baseline.location',
        'baseline.location.sector',
        'establishments',
        'evaluations',
        'evaluations.diary',
        'evaluations.infecto',
      ],
    });

    return user;
  }

  public async findByUsername(username: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { username },
      relations: [
        'baseline',
        'baseline.location',
        'establishments',
        'establishments.sectors',
        'establishments.sectors.locations',
        'role',
        'role.resources',
      ],
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
      relations: ['baseline', 'establishments'],
    });

    return user;
  }

  public async findByCPF(cpf: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { cpf },
      relations: ['baseline', 'establishments'],
    });
    return user;
  }

  public async findByStatusUnderEvaluation(): Promise<User[]> {
    const users = await this.ormRepository.find({
      where: { status: StatusEnum.UnderEvaluation },
      order: { updated_at: 'ASC' },
    });

    return users;
  }

  public async countUnderEvaluation(): Promise<number> {
    const count = await this.ormRepository
      .createQueryBuilder()
      .where('User.status = :status', { status: StatusEnum.UnderEvaluation })
      .getCount();

    return count;
  }

  public async save(user: User): Promise<User> {
    return await this.ormRepository.save(user);
  }

  public async findAll(): Promise<User[]> {
    const users = await this.ormRepository.find({
      relations: ['role', 'establishments'],
    });

    return users;
  }

  public async findByRole(roleId: string): Promise<User[]> {
    const users = await this.ormRepository.find({ roleId });

    return users;
  }
}

export default UsersRepository;
