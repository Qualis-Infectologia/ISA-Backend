import { inject, injectable } from 'tsyringe';

import AppError from '@errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

@injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }

    if (user.username==='admin') {
      throw new AppError('Usuário admin não pode ser excluído', 400);
    }

    await this.usersRepository.delete(id);
  }
}

export default DeleteUserService;
