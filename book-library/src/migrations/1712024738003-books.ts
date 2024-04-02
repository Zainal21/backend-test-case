import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class Books1712024738003 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'books',
        columns: [
          {
            name: 'id',
            type: 'char',
            length: '36',
            isPrimary: true,
          },
          {
            name: 'code',
            type: 'varchar',
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'author',
            type: 'varchar',
          },
          {
            name: 'stock',
            type: 'int',
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'books',
      new TableIndex({
        name: 'IDX_books_CODE',
        columnNames: ['code'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('books', 'IDX_books_CODE');
    await queryRunner.dropTable('books');
  }
}
