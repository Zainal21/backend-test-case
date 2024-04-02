import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Members } from './members.entity';
import { Books } from './books.entity';

@Entity()
export class BorrowedItems {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Books, (book) => book.borrowedItems, {
    cascade: ['remove'],
  })
  @JoinColumn({ name: 'book_id' })
  book: Books;

  @ManyToOne(() => Members, (member) => member.borrowedItems, {
    cascade: ['remove'],
  })
  @JoinColumn({ name: 'member_id' })
  member: Members;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;
}
