import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

@injectable()
class CountUnderEvaluationService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(): Promise<number> {
    const count = await this.usersRepository.countUnderEvaluation();
    return count;
  }
}

export default CountUnderEvaluationService;
