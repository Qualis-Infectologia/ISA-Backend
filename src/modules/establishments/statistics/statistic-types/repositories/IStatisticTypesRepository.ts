import StatisticType from "../infra/typeorm/entities/StatisticType";
import ICreateStatisticTypeDTO from "../dtos/ICreateStatisticTypeDTO";

export default interface IStatisticTypesRepository {
  create(data: ICreateStatisticTypeDTO): Promise<StatisticType>;
  delete(id: string): Promise<void>;
  findByName(name: string): Promise<StatisticType | undefined>;
  findById(id: string): Promise<StatisticType | undefined>;
  findAll(): Promise<StatisticType[]>;
  save(statisticType: StatisticType): Promise<StatisticType>;
}
