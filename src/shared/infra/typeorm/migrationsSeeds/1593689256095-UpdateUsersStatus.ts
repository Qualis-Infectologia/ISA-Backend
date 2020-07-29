import { MigrationInterface, QueryRunner, getConnection } from 'typeorm';
import User from '@users/infra/typeorm/entities/User';
import StatusEnum from '@users/enums/StatusEnum';

export class UpdateUsersStatus1593689256095 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .update(User)
      .set({ status: StatusEnum.Liberate })
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
