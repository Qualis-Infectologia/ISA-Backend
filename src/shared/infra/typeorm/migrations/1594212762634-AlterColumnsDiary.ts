import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterColumnsDiary1594212762634 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('diaries', 'abdominalPain', 'headache');
    await queryRunner.renameColumn('diaries', 'chestPain', 'nasalCongestion');
    await queryRunner.dropColumn('diaries', 'delirium');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('diaries', 'headache', 'abdominalPain');
    await queryRunner.renameColumn('diaries', 'nasalCongestion', 'chestPain');
    await queryRunner.addColumn(
      'diaries',
      new TableColumn({
        name: 'delirium',
        type: 'boolean',
        isNullable: false,
      }),
    );
  }
}
