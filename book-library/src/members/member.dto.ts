import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class MemberDto {
  @ApiProperty({
    name: 'name',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
