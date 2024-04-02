import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { BorrowedItems } from './borrowedItems.entity';

@Entity()
export class Members {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @Column({
    type: 'text',
  })
  name: string;

  @Column({
    type: 'bool',
    default: false,
  })
  penalty_status: boolean;

  @OneToMany(() => BorrowedItems, (borrowedItem) => borrowedItem.member)
  borrowedItems: BorrowedItems[];
}
