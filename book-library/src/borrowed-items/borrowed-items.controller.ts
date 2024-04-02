import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  NotFoundException,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { BorrowedItemsService } from './borrowed-items.service';
import { BorrowItemCreateDto } from './dtos/borrow-item-create.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('borrowed-items')
export class BorrowedItemsController {
  constructor(private readonly borrowedItemsService: BorrowedItemsService) {}

  @Post('')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: BorrowItemCreateDto })
  @ApiResponse({ status: 200, description: 'Book Borrowed Successfully' })
  @ApiResponse({ status: 404, description: 'Book/member not found' })
  @ApiResponse({
    status: 400,
    description:
      'Please check your paylod and connection / the book borrowed is not the same as the member who borrowed it / Members may not borrow more than 2 books',
  })
  async borrowBook(
    @Body() borrowItemCreate: BorrowItemCreateDto,
    @Res() res: Response,
  ) {
    try {
      const { member_id, book_id } = borrowItemCreate;

      const borrowed = await this.borrowedItemsService.borrowBook(
        member_id,
        book_id,
      );

      if (!borrowed) {
        throw new BadRequestException(
          'Please check your paylod and connection',
        );
      }

      return res.status(200).json({
        status: 'OK',
        message: 'Book Borrowed Successfully',
        data: borrowed,
        timestamp: new Date().getTime(),
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException(
          error.message || 'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Post('return')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: BorrowItemCreateDto })
  @ApiResponse({ status: 200, description: 'Book Returned Successfully' })
  @ApiResponse({ status: 404, description: 'Book/member not found' })
  @ApiResponse({
    status: 400,
    description:
      'Please check your paylod and connection / the book has been borrow by another member / Borrowed item not found',
  })
  async returnBook(
    @Body() borrowItemCreate: BorrowItemCreateDto,
    @Res() res: Response,
  ) {
    try {
      const { member_id, book_id } = borrowItemCreate;

      const returned = await this.borrowedItemsService.returnBook(
        member_id,
        book_id,
      );

      if (!returned) {
        throw new BadRequestException(
          'Please check your paylod and connection',
        );
      }

      return res.status(200).json({
        status: 'OK',
        message: 'Book Returned Successfully',
        data: returned,
        timestamp: new Date().getTime(),
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      } else if (error instanceof BadRequestException) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException(
          error.message || 'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
