import { inject, injectable } from 'tsyringe';
import IDiariesRepository from '../repositories/IDiariesRepository';
import Diary from '../infra/typeorm/entities/Diary';
import AppError from '@shared/errors/AppError';
import KeycloakAdmin from '@shared/keycloak/keycloak-admin';

@injectable()
class ShowDiaryService {
  constructor(
    @inject('DiariesRepository')
    private diariesRepository: IDiariesRepository,
  ) {}

  public async execute(id: string): Promise<Diary | any> {
    const diary = await this.diariesRepository.findById(id);

    if (!diary) {
      throw new AppError('Diário não encontrado', 404);
    }

    const user = await KeycloakAdmin.getUserById(diary.userId);

    return { diary: diary, user };
  }
}

export default ShowDiaryService;
