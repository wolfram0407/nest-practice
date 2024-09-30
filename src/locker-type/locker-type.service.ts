import {ConflictException, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {CreateLockerTypeReqDto} from './dto/createLockerType.req.dto';

import {LockerTypeRepository} from './repository/locker-type.repository';

import {UserAfterAuth} from 'src/common/docorator/user.decorator';
import {UpdateLockerTypeReqDto} from './dto/updateLockerType.req.dto';
import {UUID} from 'crypto';
import {LockerTypeDocument} from './schemas/locker-type.schema';


@Injectable()
export class LockerTypeService {
  constructor(
    private readonly lockerTypeRepo: LockerTypeRepository,
  ) {}

  async createLockerType(user: UserAfterAuth, createLockerTypeDto: CreateLockerTypeReqDto) {
    /* 데이터 검증 필요
      - 동일한 유저 와 락카 네임이 있는경우
    */
    const existingLockerType = await this.lockerTypeRepo.findLockerTypeByName(user, createLockerTypeDto.name);
    if (existingLockerType !== null) {
      // 유저 정보에서 동일한 락카 타입명이 존재하면 ConflictException 발생
      throw new ConflictException('User with this email already exists');
    }
    return await this.lockerTypeRepo.createLockerType(user, createLockerTypeDto)
  }

  async updateLockerType(user: UserAfterAuth, lockerTypeId: UUID, updateLockerTypeDto: UpdateLockerTypeReqDto): Promise<LockerTypeDocument> {
    const existingLockerType = await this.lockerTypeRepo.findLockerTypeByName(user, updateLockerTypeDto.name);
    if (existingLockerType !== null) {
      throw new ConflictException('User with this email already exists');
    }
    const getLockerType = await this.lockerTypeRepo.findLockerTypeByLockerId(lockerTypeId)

    if (getLockerType === null) {
      throw new NotFoundException('Locker Type NotFound');
    }

    if (getLockerType.userId !== user._id) {
      throw new UnauthorizedException('Locker Type Unauthorized');
    }
    // 락카 삭제되었을 떄 조건 추가 필요


    return await this.lockerTypeRepo.updateLockerType(getLockerType, updateLockerTypeDto)
  }

  findAll() {
    return `This action returns all lockerType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lockerType`;
  }


  remove(id: number) {
    return `This action removes a #${id} lockerType`;
  }
}
