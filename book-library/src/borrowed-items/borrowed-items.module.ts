import { Module } from '@nestjs/common';
import { BorrowedItemsService } from './borrowed-items.service';
import { BorrowedItemsController } from './borrowed-items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Members } from 'src/entities/members.entity';
import { Books } from 'src/entities/books.entity';
import { BorrowedItems } from 'src/entities/borrowedItems.entity';
import { MembersService } from 'src/members/members.service';
import { BooksService } from 'src/books/books.service';

@Module({
  imports: [TypeOrmModule.forFeature([Members, Books, BorrowedItems])],
  controllers: [BorrowedItemsController],
  providers: [BorrowedItemsService, MembersService, BooksService],
})
export class BorrowedItemsModule {}
