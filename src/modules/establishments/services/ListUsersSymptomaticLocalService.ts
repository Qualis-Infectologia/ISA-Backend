import { inject, injectable } from 'tsyringe';
import Establishment from '@establishments/infra/typeorm/entities/Establishment';
import AppError from '@shared/errors/AppError';
import { formatISO } from 'date-fns';
import IDiariesRepository from '@users/diaries/repositories/IDiariesRepository';
import User from '@users/infra/typeorm/entities/User';
import ILocationsRepository from '@establishments/sectors/locations/repositories/ILocationsRepository';

interface Return {
  name: string;
  children: ObjetUser[];
}
interface ObjetUser {
  name: string;
  users: number;
}
@injectable()
class ListUsersSymptomaticLocalService {
  constructor(
    @inject('DiariesRepository')
    private diariesRepository: IDiariesRepository,
    @inject('LocationsRepository')
    private locationsRepository: ILocationsRepository,
  ) {}

  public async execute(establishment: Establishment): Promise<Return[]> {
    let data: Return[] = [];
    let children: ObjetUser[] = [];
    for (let sector of establishment.sectors) {
      children = [];
      for (let location of sector.locations) {
        let symptomatic = 0;
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
        if (symptomatic > 0) {
          children.push({ name: location.name, users: symptomatic });
        }
      }
      if (children.length > 0) {
        data.push({ name: sector.name, children });
      }
    }

    return data;
  }
}

export default ListUsersSymptomaticLocalService;
