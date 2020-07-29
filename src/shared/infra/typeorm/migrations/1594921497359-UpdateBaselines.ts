import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class UpdateBaselines1594921497359 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'baselines',
      new TableColumn({ name: 'locationId', type: 'uuid', isNullable: true }),
    );

    await queryRunner.createForeignKey(
      'baselines',
      new TableForeignKey({
        columnNames: ['locationId'],
        name: 'Location',
        referencedColumnNames: ['id'],
        referencedTableName: 'locations',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.dropColumn('baselines', 'occupation_local');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('baselines', 'Location');
    await queryRunner.dropColumn('baselines', 'locationId');
    await queryRunner.addColumn(
      'baselines',
      new TableColumn({
        name: 'occupation_local',
        type: 'varchar',
        isNullable: false,
      }),
    );
  }
}
