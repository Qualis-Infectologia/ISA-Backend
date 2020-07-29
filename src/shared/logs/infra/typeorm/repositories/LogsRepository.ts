import { MongoRepository, getConnection } from 'typeorm';
import ILogsRepository from '@shared/logs/repositories/ILogsRepository';
import Log from '../entities/Log';

class LogsRepository implements ILogsRepository {
  private ormRepository: MongoRepository<Log>;

  constructor() {
    this.ormRepository = getConnection('mongo').getMongoRepository(Log);
  }

  public async findAll(): Promise<Log[]> {
    const logs = this.ormRepository.find({ order: { timestamp: 'DESC' } });

    return logs;
  }
}

export default LogsRepository;
