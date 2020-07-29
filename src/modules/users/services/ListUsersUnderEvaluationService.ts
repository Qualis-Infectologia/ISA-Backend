import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IDiariesRepository from '@users/diaries/repositories/IDiariesRepository';

@injectable()
class ListUsersUnderEvaluationService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('DiariesRepository')
    private diariesRepository: IDiariesRepository,
  ) {}

  public async execute(): Promise<Object[]> {
    const users = await this.usersRepository.findByStatusUnderEvaluation();

    for (const user of users) {
      delete user.password;
      const diary = await this.diariesRepository.findLastByUser(user.id);
      Object.assign(user, { diary });
    }

    return users;
  }
}

export default ListUsersUnderEvaluationService;
