import { inject, injectable } from 'tsyringe';

import StatisticType from '../infra/typeorm/entities/StatisticType';
import IStatisticTypesRepository from '../repositories/IStatisticTypesRepository';
import AppError from '@shared/errors/AppError';

interface Request {
  id: string;
  name: string;
}

@injectable()
class UpdateStatisticTypeService {
  constructor(
    @inject('StatisticTypesRepository')
    private statisticTypesRepository: IStatisticTypesRepository,
  ) {}

  public async execute({ id, name }: Request): Promise<StatisticType> {
    const oldStatistic = await this.statisticTypesRepository.findById(id);

    if (!oldStatistic) {
      throw new AppError('Tipo de Estatística não encontrado', 404);
    }

    if (oldStatistic.name !== name) {
      const checkNameUsed = await this.statisticTypesRepository.findByName(
        name,
      );

      if (checkNameUsed) {
        throw new AppError('Nome já utilizado', 400);
      }
      oldStatistic.name = name;
    }
    await this.statisticTypesRepository.save(oldStatistic);
    return oldStatistic;
  }
}

export default UpdateStatisticTypeService;
