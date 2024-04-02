import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Response } from 'express';
import { BookDto } from './books.dto';
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'All books' })
  @ApiResponse({ status: 404, description: 'Book not found' })
  async findBooks(@Res() res: Response) {
    const books = await this.booksService.getAllBooks();

    if (!books) throw new NotFoundException('Book not found');

    return res.status(200).json({
      status: 'OK',
      message: 'All Books',
      data: books,
      timestamp: new Date().getTime(),
    });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', description: 'Book ID' })
  @ApiResponse({ status: 200, description: 'Book Detail' })
  @ApiResponse({ status: 404, description: 'Book not found' })
  async findBookById(@Param() { id }, @Res() res: Response) {
    const book = await this.booksService.getBookById(id);

    if (!book) throw new NotFoundException('Book not found');

    return res.status(200).json({
      status: 'OK',
      message: 'Book Detail',
      data: book,
      timestamp: new Date().getTime(),
    });
  }

  @Post('')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: BookDto })
  @ApiResponse({ status: 201, description: 'Book created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid payload parameter' })
  async createBook(@Body() bookDto: BookDto, @Res() res: Response) {
    const book = this.booksService.createBook(bookDto);

    if (!book) throw new BadRequestException('Invalid payload parameter');

    return res.status(200).json({
      status: 'OK',
      message: 'Book created successfully',
      timestamp: new Date().getTime(),
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', description: 'Book ID' })
  @ApiResponse({ status: 200, description: 'Book deleted successfully' })
  @ApiResponse({ status: 400, description: 'Invalid payload parameter' })
  async deleteBook(@Param('id') { id }, @Res() res: Response) {
    const book = this.booksService.delete(id);

    if (!book) throw new BadRequestException('Invalid payload parameter');

    return res.status(200).json({
      status: 'OK',
      message: 'Book deleted successfully',
      timestamp: new Date().getTime(),
    });
  }
}
