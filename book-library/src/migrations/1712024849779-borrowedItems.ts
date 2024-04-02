import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class BorrowedItems1712024849779 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'borrowed_items',
        columns: [
          {
            name: 'id',
            type: 'char',
            length: '36',
            isPrimary: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );

    await queryRunner.addColumn(
      'borrowed_items',
      new TableColumn({
        name: 'member_id',
        type: 'char',
        length: '36',
      }),
    );

    await queryRunner.addColumn(
      'borrowed_items',
      new TableColumn({
        name: 'book_id',
        type: 'char',
        length: '36',
      }),
    );

    await queryRunner.createForeignKey(
      'borrowed_items',
      new TableForeignKey({
        columnNames: ['member_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'members',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'borrowed_items',
      new TableForeignKey({
        columnNames: ['book_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'books',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('borrowed_items');
  }
}
