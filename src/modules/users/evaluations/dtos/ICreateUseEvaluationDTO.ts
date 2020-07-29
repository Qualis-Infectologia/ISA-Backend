import User from '@users/infra/typeorm/entities/User';
import Diary from '@users/diaries/infra/typeorm/entities/Diary';

export default interface ICreateUserEvaluationDTO {
  user: User;
  liberate: boolean;
  days?: number;
  blocked_until?: string;
  annotation: string;
  diary: Diary;
  infecto: User;
}
