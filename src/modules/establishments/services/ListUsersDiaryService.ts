import { inject, injectable } from 'tsyringe';
import IDiariesRepository from '@users/diaries/repositories/IDiariesRepository';
import IEstablishmentsRepository from '@establishments/repositories/IEstablishmentsRepository';
import { format } from 'date-fns';

@injectable()
class ListUsersDiaryService {
  constructor(
    @inject('DiariesRepository')
    private diariesRepository: IDiariesRepository,
    @inject('EstablishmentsRepository')
    private establishmentRepository: IEstablishmentsRepository,
  ) {}

  public async execute(date: string): Promise<Object[]> {
    const users: Object[] = [];
    const establishments = await this.establishmentRepository.findAllWithUsers();
    for (const establishment of establishments) {
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
    }

    return users;
  }
}

export default ListUsersDiaryService;
