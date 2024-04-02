import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class BorrowItemCreateDto {
  @ApiProperty({
    example: '9dbe3c21-2438-44d7-813f-63be3e0f0072',
  })
  @IsNotEmpty()
  @IsString()
  member_id: string;

  @ApiProperty({
    example: 'e6f682db-24da-4293-9881-9711048cf476',
  })
  @IsNotEmpty()
  @IsString()
  book_id: string;
}
