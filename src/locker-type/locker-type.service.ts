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
      throw new ConflictException();
    }
    return await this.lockerTypeRepo.createLockerType(user, createLockerTypeDto)
  }

  async updateLockerType(user: UserAfterAuth, lockerTypeId: UUID, updateLockerTypeDto: UpdateLockerTypeReqDto): Promise<LockerTypeDocument> {
    const existingLockerType = await this.lockerTypeRepo.findLockerTypeByName(user, updateLockerTypeDto.name);
    if (existingLockerType !== null) {
      throw new ConflictException();
    }
    const getLockerType = await this.lockerTypeRepo.findLockerTypeByLockerId(lockerTypeId)

    if (getLockerType === null) {
      throw new NotFoundException();
    }

    if (getLockerType.userId !== user._id) {
      throw new UnauthorizedException();
    }
    // 락카 삭제되었을 떄 조건 추가 필요


    return await this.lockerTypeRepo.updateLockerType(getLockerType, updateLockerTypeDto)
  }

  async findAllLockerTypes(userId : UUID) {
    return await this.lockerTypeRepo.findLockerTypeByUserId(userId);
  }

  async findOneLockerType(userId: UUID, lockerTypeId : UUID) {  
    return await this.lockerTypeRepo.findOneLockerTypeByLockerId(lockerTypeId);
  }


  async deleteLockerType(userId: UUID, lockerTypeId : UUID) {
    const lockerType = await this.lockerTypeRepo.findOneLockerTypeByLockerId(lockerTypeId)
    if (!lockerType) {
      throw new NotFoundException();
    }
    if (lockerType.userId!== userId) {
      throw new UnauthorizedException();
    }
    return await this.lockerTypeRepo.deleteLockerType(lockerTypeId, lockerType);
  }
}
