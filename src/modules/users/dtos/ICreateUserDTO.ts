import Role from '@security/roles/infra/typeorm/entities/Role';
import Establishment from '@establishments/infra/typeorm/entities/Establishment';

export default interface ICreateUserDTO {
  name: string;
  username: string;
  password: string;
  role: Role;
  establishments: Establishment[];
  cpf: string;
  phone: string;
  email: string;
}
