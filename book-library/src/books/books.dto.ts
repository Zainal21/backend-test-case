import { ApiProperty } from '@nestjs/swagger';
import { isUniqueDb } from '@youba/nestjs-dbvalidator';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class BookDto {
  @ApiProperty({
    example: 'HT-102',
  })
  @IsNotEmpty()
  @IsString()
  @isUniqueDb({ table: 'books', column: 'code' })
  code: string;

  @ApiProperty({
    example: 'Atomic Habits',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Muhamad zain',
  })
  @IsNotEmpty()
  @IsString()
  author: string;

  @ApiProperty({
    example: 1,
    type: 'int',
  })
  @IsNotEmpty()
  @IsInt()
  stock: string;
}
