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
import { Response } from 'express';
import { MembersService } from './members.service';
import { MemberDto } from './member.dto';
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'Retrieve all members' })
  async findAllMember(@Res() res: Response) {
    const members = await this.membersService.getAllMember();

    if (!members) throw new NotFoundException('Member not found');

    return res.status(200).json({
      status: 'OK',
      message: 'All Members',
      data: members,
      timestamp: new Date().getTime(),
    });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', description: 'Member ID' })
  @ApiResponse({ status: 200, description: 'Retrieve member by ID' })
  @ApiResponse({ status: 404, description: 'Member not found' })
  async findMemberById(@Param() { id }, @Res() res: Response) {
    const members = await this.membersService.getMemberById(id);

    if (!members) throw new NotFoundException('Member not found');

    return res.status(200).json({
      status: 'OK',
      message: 'Member Detail',
      data: members,
      timestamp: new Date().getTime(),
    });
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: MemberDto })
  @ApiResponse({ status: 201, description: 'Member created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid payload parameter' })
  async create(@Body() memberDto: MemberDto, @Res() res: Response) {
    const member = this.membersService.createMember(memberDto);

    if (!member) throw new BadRequestException('Invalid payload parameter');

    return res.status(201).json({
      status: 'OK',
      message: 'Member created successfully',
      timestamp: new Date().getTime(),
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', description: 'Member ID' })
  @ApiResponse({ status: 200, description: 'Member deleted successfully' })
  @ApiResponse({ status: 400, description: 'Invalid payload parameter' })
  async delete(@Param('id') { id }, @Res() res: Response) {
    const member = this.membersService.delete(id);

    if (!member) throw new BadRequestException('Invalid payload parameter');

    return res.status(200).json({
      status: 'OK',
      message: 'Member deleted successfully',
      timestamp: new Date().getTime(),
    });
  }
}
