import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Members } from 'src/entities/members.entity';
import { Repository } from 'typeorm';
import { MemberDto } from './member.dto';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Members)
    private readonly memberRepository: Repository<Members>,
  ) {}
  /**
   * [get members]
   *
   * @return  {Promise<Member>}                               [return]
   */
  async getAllMember(): Promise<Members[]> {
    return await this.memberRepository
      .createQueryBuilder('member')
      .leftJoin('member.borrowedItems', 'borrowedItem')
      .loadRelationCountAndMap(
        'member.borrowedItemCount',
        'member.borrowedItems',
      )
      .getMany();
  }

  /**
   * [get members by id]
   *
   * @return  {Promise<Member>}                               [return]
   */
  async getMemberById(id: string): Promise<Members> {
    return await this.memberRepository.findOne({
      relations: ['borrowedItems'],
      where: {
        id: id,
      },
    });
  }

  /**
   * [create member]
   *
   * @param   {MemberDto<Members>}  memberDto  [memberDto]
   *
   * @return  {Promise<Members>}                               [return]
   */
  async createMember(memberDto: MemberDto): Promise<Members> {
    return this.memberRepository.save({
      code: await this.generateSequenceNumber(),
      name: memberDto.name,
    });
  }

  async generateSequenceNumber(): Promise<string> {
    let code = 'M001';
    const lastRecord = await this.memberRepository.find({
      order: { id: 'DESC' },
    });
    if (lastRecord.length > 0) {
      const lastSequenceNumber = lastRecord[0].code;
      const sequenceNumber = this.incrementSequenceNumber(lastSequenceNumber);
      code = sequenceNumber;
    }
    return code;
  }

  incrementSequenceNumber(lastSequenceNumber: string): string {
    const numericPart = parseInt(lastSequenceNumber.substring(1), 10);
    const incrementedNumericPart = numericPart + 1;
    const paddedNumericPart = incrementedNumericPart
      .toString()
      .padStart(3, '0');
    const sequenceNumber = `M${paddedNumericPart}`;
    return sequenceNumber;
  }

  /**
   * [delete member]
   *
   * @param   {string}  id  [id]
   *
   * @return  {Promise<boolean>}                               [return]
   */
  async delete(id: string): Promise<boolean> {
    const book = await this.memberRepository.delete({
      id: id,
    });

    if (book?.affected < 1) return false;

    return true;
  }
}
