import { inject, injectable } from 'tsyringe';
import IBaselinesRepository from '../repositories/IBaselinesRepository';
import Baseline from '../infra/typeorm/entities/Baseline';
import AppError from '@shared/errors/AppError';
import KeycloakAdmin from '@shared/keycloak/keycloak-admin';
@injectable()
class ShowBaselineService {
  constructor(
    @inject('BaselinesRepository')
    private baselinesRepository: IBaselinesRepository,
  ) {}

  public async execute(id: string): Promise<Baseline | any> {
    const baseline = await this.baselinesRepository.findById(id);
    if (!baseline) {
      throw new AppError('Baseline não encontrado', 404);
    }
    const user = await KeycloakAdmin.getUserById(id);

    return { baseline: baseline, user };
  }
}

export default ShowBaselineService;
