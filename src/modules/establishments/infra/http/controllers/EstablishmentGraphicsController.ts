import { Response, Request } from 'express';
import { container } from 'tsyringe';
import ListUsersApprovedNotApprovedByDateService from '@establishments/services/ListUsersApprovedNotApprovedByDateService';
import ListUsersAccessionService from '@establishments/services/ListUsersAccessionService';
import ListUsersSymptomsService from '@establishments/services/ListUsersSymptomsService';
import ListUsersApprovedNotApprovedByDateTotalService from '@establishments/services/ListUsersApprovedNotApprovedByDateTotalService';
import ListUsersAccessionTotalService from '@establishments/services/ListUsersAccessionTotalService';
import ListUsersSymptomsTotalService from '@establishments/services/ListUsersSymptomsTotalService';
import ListSymptomaticTotalService from '@establishments/services/ListSymptomaticTotalService';
import ListSymptomaticService from '@establishments/services/ListSymptomaticService';
import ListNumberUsersAccessionTotalService from '@establishments/services/ListNumberUsersAccessionTotalService';
import ListNumberUsersAccessionService from '@establishments/services/ListNumberUsersAccessionService';
import ListUsersApprovedTotalService from '@establishments/services/ListUsersApprovedTotalService';
import ListUsersApprovedService from '@establishments/services/ListUsersApprovedService';
import ListUsersNotApprovedService from '@establishments/services/ListUsersNotApprovedService';
import ListUsersNotApprovedTotalService from '@establishments/services/ListUsersNotApprovedTotalService';
import ListUsersTotalService from '@establishments/services/ListUsersTotalService';
import ListUsersService from '@establishments/services/ListUsersService';
import ListSymptomDiariesService from '@establishments/services/ListSymptomDiariesService';
import ListSymptomDiariesTotalService from '@establishments/services/ListSymptomDiariesTotalService';
import ListUsersSymptomaticLocalService from '@establishments/services/ListUsersSymptomaticLocalService';
import ListUsersSymptomaticLocalTotalService from '@establishments/services/ListUsersSymptomaticLocalTotalService';

class EstablishmentGraphicsController {
  public async approvedNotApproved(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { startDate, endDate } = request.params;
    let data = [];
    // @ts-ignore
    const establishment = request.establishment;
    // @ts-ignore
    const user = request.user;

    if (user.role.name === 'Responsável') {
      const listUsersApprovedNotApprovedByDateService = container.resolve(
        ListUsersApprovedNotApprovedByDateService,
      );
      data = await listUsersApprovedNotApprovedByDateService.execute(
        establishment,
        startDate,
        endDate,
      );
    } else {
      const listUsersApprovedNotApprovedByDateTotalService = container.resolve(
        ListUsersApprovedNotApprovedByDateTotalService,
      );

      data = await listUsersApprovedNotApprovedByDateTotalService.execute(
        establishment,
        startDate,
        endDate,
      );
    }

    return response.status(200).json(data);
  }

  public async accession(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { startDate, endDate } = request.params;
    let data = [];
    // @ts-ignore
    const establishment = request.establishment;
    // @ts-ignore
    const user = request.user;

    if (user.role.name === 'Responsável') {
      const listUsersAccessionService = container.resolve(
        ListUsersAccessionService,
      );

      data = await listUsersAccessionService.execute(
        establishment,
        startDate,
        endDate,
      );
    } else {
      const listUsersAccessionTotalService = container.resolve(
        ListUsersAccessionTotalService,
      );

      data = await listUsersAccessionTotalService.execute(
        establishment,
        startDate,
        endDate,
      );
    }

    return response.status(200).json(data);
  }

  public async symptoms(
    request: Request,
    response: Response,
  ): Promise<Response> {
    let data = [];
    // @ts-ignore
    const establishment = request.establishment;
    // @ts-ignore
    const user = request.user;

    if (user.role.name === 'Responsável') {
      const listUsersSymptomsService = container.resolve(
        ListUsersSymptomsService,
      );

      data = await listUsersSymptomsService.execute(establishment);
    } else {
      const listUsersSymptomsTotalService = container.resolve(
        ListUsersSymptomsTotalService,
      );

      data = await listUsersSymptomsTotalService.execute(establishment);
    }

    return response.status(200).json(data);
  }

  public async usersSymptomatic(
    request: Request,
    response: Response,
  ): Promise<Response> {
    let data = 0;
    // @ts-ignore
    const establishment = request.establishment;
    // @ts-ignore
    const user = request.user;

    if (user.role.name === 'Responsável') {
      const listSymptomaticService = container.resolve(ListSymptomaticService);

      data = await listSymptomaticService.execute(establishment);
    } else {
      const listSymptomaticTotalService = container.resolve(
        ListSymptomaticTotalService,
      );

      data = await listSymptomaticTotalService.execute(establishment);
    }

    return response.status(200).json(data);
  }

  public async symptomDiaries(
    request: Request,
    response: Response,
  ): Promise<Response> {
    let data = [];
    // @ts-ignore
    const establishment = request.establishment;
    // @ts-ignore
    const user = request.user;

    if (user.role.name === 'Responsável') {
      const listSymptomDiariesService = container.resolve(
        ListSymptomDiariesService,
      );

      data = await listSymptomDiariesService.execute(establishment);
    } else {
      const listSymptomDiariesTotalService = container.resolve(
        ListSymptomDiariesTotalService,
      );

      data = await listSymptomDiariesTotalService.execute(establishment);
    }

    return response.status(200).json(data);
  }

  public async usersAccession(
    request: Request,
    response: Response,
  ): Promise<Response> {
    let data = 0;
    // @ts-ignore
    const establishment = request.establishment;
    // @ts-ignore
    const user = request.user;

    if (user.role.name === 'Responsável') {
      const listNumberUsersAccessionService = container.resolve(
        ListNumberUsersAccessionService,
      );

      data = await listNumberUsersAccessionService.execute(establishment);
    } else {
      const listNumberUsersAccessionTotalService = container.resolve(
        ListNumberUsersAccessionTotalService,
      );

      data = await listNumberUsersAccessionTotalService.execute(establishment);
    }

    return response.status(200).json(data);
  }

  public async usersApproved(
    request: Request,
    response: Response,
  ): Promise<Response> {
    let data = 0;
    // @ts-ignore
    const establishment = request.establishment;
    // @ts-ignore
    const user = request.user;

    if (user.role.name === 'Responsável') {
      const listUsersApprovedService = container.resolve(
        ListUsersApprovedService,
      );

      data = await listUsersApprovedService.execute(establishment);
    } else {
      const listUsersApprovedTotalService = container.resolve(
        ListUsersApprovedTotalService,
      );

      data = await listUsersApprovedTotalService.execute(establishment);
    }

    return response.status(200).json(data);
  }

  public async usersNotApproved(
    request: Request,
    response: Response,
  ): Promise<Response> {
    let data = 0;
    // @ts-ignore
    const establishment = request.establishment;
    // @ts-ignore
    const user = request.user;

    if (user.role.name === 'Responsável') {
      const listUsersNotApprovedService = container.resolve(
        ListUsersNotApprovedService,
      );

      data = await listUsersNotApprovedService.execute(establishment);
    } else {
      const listUsersNotApprovedTotalService = container.resolve(
        ListUsersNotApprovedTotalService,
      );

      data = await listUsersNotApprovedTotalService.execute(establishment);
    }

    return response.status(200).json(data);
  }

  public async usersNumber(
    request: Request,
    response: Response,
  ): Promise<Response> {
    let data = 0;
    // @ts-ignore
    const establishment = request.establishment;
    // @ts-ignore
    const user = request.user;

    if (user.role.name === 'Responsável') {
      const listUsersTotalService = container.resolve(ListUsersService);

      data = await listUsersTotalService.execute(establishment);
    } else {
      const listUsersService = container.resolve(ListUsersTotalService);

      data = await listUsersService.execute(establishment);
    }

    return response.status(200).json(data);
  }

  public async symptomaticLocal(
    request: Request,
    response: Response,
  ): Promise<Response> {
    let data = [];
    // @ts-ignore
    const establishment = request.establishment;
    // @ts-ignore
    const user = request.user;

    if (user.role.name === 'Responsável') {
      const listUsersSymptomaticLocal = container.resolve(
        ListUsersSymptomaticLocalService,
      );

      data = await listUsersSymptomaticLocal.execute(establishment);
    } else {
      const listUsersSymptomaticLocalTotal = container.resolve(
        ListUsersSymptomaticLocalTotalService,
      );

      data = await listUsersSymptomaticLocalTotal.execute();
    }

    return response.status(200).json(data);
  }
}

export default new EstablishmentGraphicsController();
