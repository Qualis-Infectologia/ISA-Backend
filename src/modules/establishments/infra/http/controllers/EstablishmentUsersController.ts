import { Response, Request } from 'express';
import { container } from 'tsyringe';
import ListEstablishmentUsersDiaryService from '@establishments/services/ListEstablishmentUsersDiaryService';
import ListUsersDiaryService from '@establishments/services/ListUsersDiaryService';

class EstablishmentUsersController {
  public async diary(request: Request, response: Response): Promise<Response> {
    const { date } = request.params;
    let users = [];
    // @ts-ignore
    const establishment = request.establishment;
    // @ts-ignore
    const user = request.user;

    if (user.role.name === 'Responsável') {
      const listUsersDiaryService = container.resolve(
        ListEstablishmentUsersDiaryService,
      );

      users = await listUsersDiaryService.execute(establishment, date);
    } else {
      const listUsersDiaryService = container.resolve(ListUsersDiaryService);

      users = await listUsersDiaryService.execute(date);
    }

    return response.status(200).json(users);
  }
}

export default new EstablishmentUsersController();
