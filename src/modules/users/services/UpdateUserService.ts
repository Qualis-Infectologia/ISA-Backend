import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IEstablishmentsRepository from '@establishments/repositories/IEstablishmentsRepository';
import IRolesRepository from '@security/roles/repositories/IRolesRepository';
import Establishment from '@establishments/infra/typeorm/entities/Establishment';
interface Request {
  id: string;
  name: string;
  username: string;
  cpf: string;
  phone: string;
  email: string;
  roleId?: string;
  establishments?: Establishment[] | string[];
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
    @inject('EstablishmentsRepository')
    private establishmentsRepository: IEstablishmentsRepository,
  ) {}

  public async execute({
    id,
    name,
    username,
    cpf,
    phone,
    email,
    roleId,
    establishments,
  }: Request): Promise<User> {
    let allEstablishments: Establishment[] = [];
    const oldUser = await this.usersRepository.findById(id);

    if (!oldUser) {
      throw new AppError('Usuário não encontrado', 404);
    }

    if (oldUser.username !== username) {
      const checkUsernameExists = await this.usersRepository.findByUsername(
        username,
      );

      if (checkUsernameExists) {
        throw new AppError('Username já utilizado', 400);
      }

      oldUser.username = username;
    }

    if (oldUser.cpf !== cpf) {
      const checkCPFExists = await this.usersRepository.findByCPF(cpf);

      if (checkCPFExists) {
        throw new AppError('CPF já utilizado', 400);
      }

      oldUser.cpf = cpf;
    }

    if (oldUser.email !== email) {
      const checkEmailExist = await this.usersRepository.findByEmail(email);

      if (checkEmailExist) {
        throw new AppError('E-mail já utilizado', 400);
      }

      oldUser.email = email;
    }

    if (oldUser.name !== name) {
      oldUser.name = name;
    }

    if (oldUser.phone !== phone) {
      oldUser.phone = phone;
    }

    if (roleId) {
      const role = await this.rolesRepository.findById(roleId);

      if (!role) {
        throw new AppError('Perfil não encontrado', 404);
      }

      oldUser.role = role;
    }

    if (establishments) {
      if (establishments[0] instanceof Object) {
        //@ts-ignore
        allEstablishments = establishments;
      } else {
        for (const es of establishments) {
          const establishment = await this.establishmentsRepository.findById(
            //@ts-ignore
            es,
          );

          if (!establishment) {
            throw new AppError('Estabelecimento não encontrado', 404);
          }

          allEstablishments.push(establishment);
        }
      }
      oldUser.establishments = allEstablishments;
    }

    await this.usersRepository.save(oldUser);
    return oldUser;
  }
}

export default UpdateUserService;
