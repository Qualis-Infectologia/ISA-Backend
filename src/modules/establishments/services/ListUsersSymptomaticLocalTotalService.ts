import { inject, injectable } from 'tsyringe';
import Establishment from '@establishments/infra/typeorm/entities/Establishment';
import AppError from '@shared/errors/AppError';
import { formatISO } from 'date-fns';
import IDiariesRepository from '@users/diaries/repositories/IDiariesRepository';
import User from '@users/infra/typeorm/entities/User';
import ILocationsRepository from '@establishments/sectors/locations/repositories/ILocationsRepository';
import IEstablishmentsRepository from '@establishments/repositories/IEstablishmentsRepository';

interface Return {
  name: string;
  children: ObjetUser[];
}
interface ObjetUser {
  name: string;
  users: number;
}
@injectable()
class ListUsersSymptomaticLocalTotalService {
  constructor(
    @inject('DiariesRepository')
    private diariesRepository: IDiariesRepository,
    @inject('LocationsRepository')
    private locationsRepository: ILocationsRepository,
    @inject('EstablishmentsRepository')
    private establishmentsRepository: IEstablishmentsRepository,
  ) {}

  public async execute(): Promise<Return[]> {
    let data: Return[] = [];
    let children: ObjetUser[] = [];
    let symptomatic = 0;
    const establishments = await this.establishmentsRepository.findAllWithSectors();
    for (const establishment of establishments) {
      children = [];
      for (let sector of establishment.sectors) {
        symptomatic = 0;
        for (let location of sector.locations) {
          let loc = await this.locationsRepository.findById(location.id);
          if (!loc) {
            throw new AppError('Localização não encontrada', 404);
          }
          for (let baseline of loc.baselines) {
            const diary = await this.diariesRepository.findNotApproved(
              baseline.userId,
            );
            if (diary) {
              symptomatic++;
            }
          }
        }
        if (symptomatic > 0) {
          children.push({ name: sector.name, users: symptomatic });
        }
      }
      if (children.length > 0) {
        data.push({ name: establishment.name, children });
      }
    }

    return data;
  }
}

export default ListUsersSymptomaticLocalTotalService;
