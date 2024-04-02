import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { BorrowedItems } from './borrowedItems.entity';

@Entity()
export class Books {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @Column({
    type: 'text',
  })
  title: string;

  @Column({
    type: 'text',
  })
  author: string;

  @Column({
    type: 'int',
  })
  stock: string;

  @OneToMany(() => BorrowedItems, (borrowedItem) => borrowedItem.member)
  borrowedItems: BorrowedItems[];
}
