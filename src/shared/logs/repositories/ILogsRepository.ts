import Log from '../infra/typeorm/entities/Log';

export default interface ILogsRepository {
  findAll(): Promise<Log[]>;
}
