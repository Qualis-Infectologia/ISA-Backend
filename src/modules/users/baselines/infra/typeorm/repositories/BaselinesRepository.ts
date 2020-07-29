import { getRepository, Repository } from 'typeorm';
import Baseline from '../entities/Baseline';
import ICreateUserBaselineDTO from '@users/baselines/dtos/ICreateUserBaselineDTO';
import IBaselinesRepository from '@users/baselines/repositories/IBaselinesRepository';

class BaselinesRepository implements IBaselinesRepository {
  private ormRepository: Repository<Baseline>;

  constructor() {
    this.ormRepository = getRepository(Baseline);
  }

  public async create(data: ICreateUserBaselineDTO) {
    const baseline = this.ormRepository.create(data);

    await this.ormRepository.save(baseline);

    return baseline;
  }

  public async save(baseline: Baseline): Promise<Baseline> {
    return await this.ormRepository.save(baseline);
  }

  public async findById(id: string): Promise<Baseline | undefined> {
    return await this.ormRepository.findOne({
      where: { id },
    });
  }
}

export default BaselinesRepository;
