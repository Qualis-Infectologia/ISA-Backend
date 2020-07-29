import { inject, injectable } from 'tsyringe';
import Establishment from '@establishments/infra/typeorm/entities/Establishment';
import IDiariesRepository from '@users/diaries/repositories/IDiariesRepository';

@injectable()
class ListEstablishmentUsersDiaryService {
  constructor(
    @inject('DiariesRepository')
    private diariesRepository: IDiariesRepository,
  ) {}

  public async execute(
    establishment: Establishment,
    date: string,
  ): Promise<Object[]> {
    const users: Object[] = [];
    for (const user of establishment.users) {
      let approved = 'Indefinido';
      let hour = null;
      const diary = await this.diariesRepository.findInDateByUser(
        date,
        user.id,
      );
      if (diary) {
        approved = diary.approved ? 'Permitido' : 'Negado';
        hour = diary.created_at;
      }

      users.push({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        approved: approved,
        diary: diary || null,
        hour,
      });
    }

    return users;
  }
}

export default ListEstablishmentUsersDiaryService;
