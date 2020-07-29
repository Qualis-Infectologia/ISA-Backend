import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddStatusUser1593624866506 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'status',
        type: 'enum',
        enumName: 'Status',
        enum: ['L', 'D', 'UE'],
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'status');
  }
}
