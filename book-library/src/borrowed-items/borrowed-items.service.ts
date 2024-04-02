import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { Books } from 'src/entities/books.entity';
import { BorrowedItems } from 'src/entities/borrowedItems.entity';
import { Members } from 'src/entities/members.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BorrowedItemsService {
  constructor(
    @InjectRepository(Members)
    private readonly memberRepository: Repository<Members>,
    @InjectRepository(Books)
    private readonly bookRepository: Repository<Books>,
    @InjectRepository(BorrowedItems)
    private readonly BorrowedItemRepository: Repository<BorrowedItems>,
  ) {}

  async borrowBook(memberId: string, bookId: string): Promise<BorrowedItems> {
    const member = await this.memberRepository.findOne({
      where: {
        id: memberId,
      },
    });

    if (!member) {
      throw new NotFoundException('Member not found');
    }

    if (member.penalty_status) {
      throw new BadRequestException('Member is currently not being penalized');
    }

    const book = await this.bookRepository.findOne({
      where: {
        id: bookId,
      },
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    // check member not borrow more than 2 books
    const TotalCountMemberIsNotBorrow = await this.getCountBorrowItemByMemberId(
      memberId,
    );

    if (TotalCountMemberIsNotBorrow > 1) {
      throw new BadRequestException('Members may not borrow more than 2 books');
    }

    // check book not borrowed by other member
    const bookIsNotBorrowOtherMember = await this.getCountBorrowedByBookId(
      bookId,
    );

    if (bookIsNotBorrowOtherMember > 1) {
      throw new Error('the book has been borrow by another member');
    }

    const newBorrowedItem = this.BorrowedItemRepository.create({
      member: member,
      book: book,
    });

    return await this.BorrowedItemRepository.save(newBorrowedItem);
  }

  async returnBook(memberId: string, bookId: string) {
    const member = await this.memberRepository.findOne({
      where: {
        id: memberId,
      },
    });

    if (!member) {
      throw new NotFoundException('Member not found');
    }

    const book = await this.bookRepository.findOne({
      where: {
        id: bookId,
      },
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }
    // check is return book is same member borrowed

    const isSameBorrowedMember = await this.checkBorrowedIsSameMember(
      memberId,
      bookId,
    );
    if (!isSameBorrowedMember) {
      throw new BadRequestException(
        'the book borrowed is not the same as the member who borrowed it',
      );
    }

    // Calculate the duration the book was borrowed for
    const borrowedItem = await this.BorrowedItemRepository.findOne({
      where: { member: member, book: book },
    });
    if (!borrowedItem) {
      throw new NotFoundException('Borrowed item not found');
    }

    const borrowDate = borrowedItem.createdAt;
    const returnDate = new Date();
    const borrowedDays = this.calculateDaysDifference(borrowDate, returnDate);

    // If the book was returned after more than 7 days, apply penalty
    if (borrowedDays > 7) {
      member.penalty_status = true;
      await this.memberRepository.save(member);
    }

    const deleteBorrowItem = await this.BorrowedItemRepository.delete({
      member: {
        id: memberId,
      },
      book: {
        id: bookId,
      },
    });

    if (deleteBorrowItem?.affected < 1) return false;

    return true;
  }

  private calculateDaysDifference(startDate: Date, endDate: Date): number {
    const diffInTime = endDate.getTime() - startDate.getTime();
    const diffInDays = diffInTime / (1000 * 3600 * 24);
    return Math.round(diffInDays);
  }

  async getCountByCondition(condition: string, params: any[]): Promise<number> {
    const query = `SELECT COUNT(1) AS cnt FROM borrowed_items WHERE ${condition}`;
    const countResult = await this.BorrowedItemRepository.query(query, params);
    if (countResult && countResult.length > 0) {
      const count = countResult[0].cnt;
      if (!isNaN(count)) {
        return parseInt(count);
      }
    }
    return 0;
  }

  async getCountBorrowItemByMemberId(memberId: string): Promise<number> {
    const condition = 'member_id = ?';
    return await this.getCountByCondition(condition, [memberId]);
  }

  async getCountBorrowedByBookId(bookId: string): Promise<number> {
    const condition = 'book_id = ?';
    return await this.getCountByCondition(condition, [bookId]);
  }

  async checkBorrowedIsSameMember(
    memberId: string,
    bookId: string,
  ): Promise<number> {
    const condition = 'book_id = ? AND member_id = ?';
    return await this.getCountByCondition(condition, [bookId, memberId]);
  }
}
