import { inject, injectable } from 'tsyringe';

import Establishment from '@modules/establishments/infra/typeorm/entities/Establishment';
import AppError from '@errors/AppError';
import IEstablishmentsRepository from '@establishments/repositories/IEstablishmentsRepository';

interface Request {
  id: string;
  name: string;
  email: string;
  cnpj: string;
  phone: string;
  city: string;
  active: boolean;
}

@injectable()
class UpdateEstablishmentService {
  constructor(
    @inject('EstablishmentsRepository')
    private establishmentsRepository: IEstablishmentsRepository,
  ) {}

  public async execute({
    id,
    name,
    email,
    cnpj,
    phone,
    city,
    active,
  }: Request): Promise<Establishment> {
    const oldEstablishment = await this.establishmentsRepository.findById(id);

    if (!oldEstablishment) {
      throw new AppError('Estabelecimento não encontrado', 404);
    }

    if (oldEstablishment.name !== name) {
      const checkNameUsed = await this.establishmentsRepository.findByName(
        name,
      );

      if (checkNameUsed) {
        throw new AppError('Nome já utilizado', 400);
      }

      oldEstablishment.name = name;
    }

    if (oldEstablishment.cnpj !== cnpj) {
      const checkCnpjUsed = await this.establishmentsRepository.findByCnpj(
        cnpj,
      );

      if (checkCnpjUsed) {
        throw new AppError('CNPJ já utilizado', 400);
      }

      oldEstablishment.cnpj = cnpj;
    }

    if (oldEstablishment.email !== email) {
      oldEstablishment.email = email;
    }

    if (oldEstablishment.active !== active) {
      oldEstablishment.active = active;
    }

    if (oldEstablishment.phone !== phone) {
      oldEstablishment.phone = phone;
    }

    if (oldEstablishment.city !== city) {
      oldEstablishment.city = city;
    }

    await this.establishmentsRepository.save(oldEstablishment);
    return oldEstablishment;
  }
}

export default UpdateEstablishmentService;
