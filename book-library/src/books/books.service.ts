import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Books } from 'src/entities/books.entity';
import { Repository } from 'typeorm';
import { BookDto } from './books.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Books)
    private readonly bookRepository: Repository<Books>,
  ) {}
  /**
     /**
   * [get books]
   *
   * @return  {Promise<books[]>}                               [return]
   */
  async getAllBooks(): Promise<Books[]> {
    return await this.bookRepository
      .createQueryBuilder('book')
      .leftJoin(
        'borrowed_items',
        'borrowedItem',
        'borrowedItem.book_id = book.id',
      )
      .select([
        'book.id as id',
        'book.code as code',
        'book.title as title',
        'book.author as author',
        'book.stock as stock',
      ])
      .where('borrowedItem.id IS NULL')
      .getRawMany();
  }

  /**
   * [get books by id]
   *
   * @return  {Promise<Books>}                               [return]
   */
  async getBookById(id: string): Promise<Books> {
    return await this.bookRepository.findOne({
      relations: ['borrowedItems'],
      where: {
        id: id,
      },
    });
  }

  /**
   * [create book]
   *
   * @param   {BookDto<Books>}  bookDto  [bookDto]
   *
   * @return  {Promise<Books>}                               [return]
   */
  async createBook(bookDto: BookDto): Promise<Books> {
    const { code, title, author, stock } = bookDto;
    return this.bookRepository.save({
      code,
      title,
      author,
      stock,
    });
  }
  /**
   * [delete book]
   *
   * @param   {string}  id  [id]
   *
   * @return  {Promise<boolean>}                               [return]
   */
  async delete(id: string): Promise<boolean> {
    const book = await this.bookRepository.delete({
      id: id,
    });

    if (book?.affected < 1) return false;

    return true;
  }
}
