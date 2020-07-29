import {
  MigrationInterface,
  QueryRunner,
  TableForeignKey,
  Table,
} from 'typeorm';

export class CreateEvaluations1594040843973 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'evaluations',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'liberate',
            type: 'boolean',
            isNullable: false,
          },
          {
            name: 'days',
            type: 'int4',
            isNullable: true,
          },
          {
            name: 'blocked_until',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'annotation',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'diaryId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'userId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'infectoId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'evaluations',
      new TableForeignKey({
        columnNames: ['userId'],
        name: 'User',
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'evaluations',
      new TableForeignKey({
        columnNames: ['infectoId'],
        name: 'Infecto',
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'evaluations',
      new TableForeignKey({
        columnNames: ['diaryId'],
        name: 'Diary',
        referencedColumnNames: ['id'],
        referencedTableName: 'diaries',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('evaluations');
  }
}
