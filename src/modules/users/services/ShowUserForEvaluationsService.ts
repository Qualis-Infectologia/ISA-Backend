import { inject, injectable } from 'tsyringe';

import AppError from '@errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IDiariesRepository from '@users/diaries/repositories/IDiariesRepository';

@injectable()
class ShowUserForEvaluationsService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('DiariesRepository')
    private diariesRepository: IDiariesRepository,
  ) {}

  public async execute(id: string): Promise<Object> {
    const user = await this.usersRepository.findByIdForEvaluations(id);

    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }

    const diary = await this.diariesRepository.findLastByUser(id);

    if (!diary) {
      throw new AppError('Diário não encontrado', 404);
    }

    delete user.password;

    return { user, diary };
  }
}

export default ShowUserForEvaluationsService;
