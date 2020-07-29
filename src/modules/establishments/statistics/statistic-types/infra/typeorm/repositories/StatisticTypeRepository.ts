import { getRepository, Repository } from "typeorm";
import IStatisticTypesRepository from "@establishments/statistics/statistic-types/repositories/IStatisticTypesRepository";
import StatisticType from "../entities/StatisticType";
import ICreateStatisticTypeDTO from "@establishments/statistics/statistic-types/dtos/ICreateStatisticTypeDTO";

class StatisticTypesRepository implements IStatisticTypesRepository {
  private ormRepository: Repository<StatisticType>;

  constructor() {
    this.ormRepository = getRepository(StatisticType);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async create(data: ICreateStatisticTypeDTO): Promise<StatisticType> {
    const statisticType = this.ormRepository.create(data);

    await this.ormRepository.save(statisticType);

    return statisticType;
  }

  public async findByName(name: string): Promise<StatisticType | undefined> {
    const statisticType = this.ormRepository.findOne({ where: { name } });

    return statisticType;
  }

  public async findAll(): Promise<StatisticType[]> {
    const statisticTypes = this.ormRepository.find();

    return statisticTypes;
  }

  public async findById(id: string): Promise<StatisticType | undefined> {
    const statisticType = this.ormRepository.findOne({
      where: { id },
      relations: ["statistics"],
    });

    return statisticType;
  }

  public async save(statisticType: StatisticType): Promise<StatisticType> {
    return await this.ormRepository.save(statisticType);
  }
}

export default StatisticTypesRepository;
