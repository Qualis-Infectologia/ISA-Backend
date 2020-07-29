import { getRepository, Repository } from 'typeorm';
import IEvaluationsRepository from '@users/evaluations/repositories/IEvaluationsRepository';
import Evaluation from '../entities/Evaluation';
import ICreateUserEvaluationDTO from '@users/evaluations/dtos/ICreateUseEvaluationDTO';

class EvaluationsRepository implements IEvaluationsRepository {
  private ormRepository: Repository<Evaluation>;

  constructor() {
    this.ormRepository = getRepository(Evaluation);
  }

  public async create(data: ICreateUserEvaluationDTO) {
    const evaluation = this.ormRepository.create(data);

    await this.ormRepository.save(evaluation);

    return evaluation;
  }

  public async save(evaluation: Evaluation): Promise<Evaluation> {
    return await this.ormRepository.save(evaluation);
  }

  public async findById(id: string): Promise<Evaluation | undefined> {
    return await this.ormRepository.findOne({
      where: { id },
      relations: ['user', 'diary', 'infecto'],
    });
  }
}

export default EvaluationsRepository;
