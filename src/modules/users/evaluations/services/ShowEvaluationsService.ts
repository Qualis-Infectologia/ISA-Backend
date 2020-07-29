import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IEvaluationsRepository from '../repositories/IEvaluationsRepository';
import Evaluation from '../infra/typeorm/entities/Evaluation';

@injectable()
class ShowEvaluationsService {
  constructor(
    @inject('EvaluationsRepository')
    private evaluationsRepository: IEvaluationsRepository,
  ) {}

  public async execute(id: string): Promise<Evaluation> {
    const evaluation = await this.evaluationsRepository.findById(id);

    if (!evaluation) {
      throw new AppError('Avaliação não encontrada', 404);
    }

    return evaluation;
  }
}

export default ShowEvaluationsService;
