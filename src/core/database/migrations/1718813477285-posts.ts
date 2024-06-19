import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class Posts1718813477285 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'es_tb_posts',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'text',
            type: 'text',
          },
          {
            name: 'owner',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );
    await queryRunner.createForeignKey(
      'es_tb_posts',
      new TableForeignKey({
        columnNames: ['owner'],
        referencedColumnNames: ['id'],
        referencedTableName: 'es_tb_user',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        name: 'FK_POST_OWNER',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('es_tb_posts', 'FK_POST_OWNER');
    await queryRunner.dropTable('es_tb_posts');
  }
}
