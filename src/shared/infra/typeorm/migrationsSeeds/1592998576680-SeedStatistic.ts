import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import StatisticType from "@establishments/statistics/statistic-types/infra/typeorm/entities/StatisticType";
import StatisticTypes from '../seeds/StatisticTypes.seed'
export class SeedStatistic1592998576680 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      const statisticTypesRepository = getRepository(StatisticType);
      for (const statisticType of StatisticTypes) {
        const statisticTypeCreated = statisticTypesRepository.create(statisticType)
        await statisticTypesRepository.save(statisticTypeCreated);
      }
    } catch (err) {
      console.log(err)
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
