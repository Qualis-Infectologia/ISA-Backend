import { Response, Request } from 'express';
import { container } from 'tsyringe';
import CreateEstablishmentService from '@modules/establishments/services/CreateEstablishmentService';
import ShowEstablishmentService from '@modules/establishments/services/ShowEstablishmentService';
import ListEstablishmentsService from '@modules/establishments/services/ListEstablishmentsService';
import DeleteEstablishmentService from '@establishments/services/DeleteEstablishmentService';
import UpdateEstablishmentService from '@establishments/services/UpdateEstablishmentService';

class EstablishmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, cnpj, phone, city, active } = request.body;

    const createEstablishmentService = container.resolve(
      CreateEstablishmentService,
    );

    const establishment = await createEstablishmentService.execute({
      name,
      email,
      cnpj,
      phone,
      city,
      active,
    });

    return response.status(201).json(establishment);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id, name, email, cnpj, phone, city, active } = request.body;

    const updateEstablishmentService = container.resolve(
      UpdateEstablishmentService,
    );

    const establishment = await updateEstablishmentService.execute({
      id,
      name,
      email,
      cnpj,
      phone,
      city,
      active,
    });

    return response.status(200).json(establishment);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showEstablishmentService = container.resolve(
      ShowEstablishmentService,
    );

    const establishment = await showEstablishmentService.execute(id);

    return response.status(200).json(establishment);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listEstablishmentService = container.resolve(
      ListEstablishmentsService,
    );

    const establishments = await listEstablishmentService.execute();

    return response.status(200).json(establishments);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteEstablishmentService = container.resolve(
      DeleteEstablishmentService,
    );

    await deleteEstablishmentService.execute(id);

    return response.status(200).json();
  }
}

export default new EstablishmentsController();
