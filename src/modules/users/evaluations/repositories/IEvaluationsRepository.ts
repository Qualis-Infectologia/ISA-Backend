import Evaluation from '../infra/typeorm/entities/Evaluation';
import ICreateUserEvaluationDTO from '../dtos/ICreateUseEvaluationDTO';

export default interface IEvaluationsRepository {
  create(data: ICreateUserEvaluationDTO): Promise<Evaluation>;
  save(diary: Evaluation): Promise<Evaluation>;
  findById(id: string): Promise<Evaluation | undefined>;
}
