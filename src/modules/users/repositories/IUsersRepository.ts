import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

export default interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<User | undefined>;
  findByIdForEvaluations(id: string): Promise<User | undefined>;
  findByCPF(id: string): Promise<User | undefined>;
  findByUsername(username: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findByRole(roleId: string): Promise<User[]>;
  findByStatusUnderEvaluation(): Promise<User[]>;
  save(user: User): Promise<User>;
  findAll(): Promise<User[]>;
  countUnderEvaluation(): Promise<number>;
}
