import {ConflictException, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {CreateLockerTypeReqDto} from './dto/createLockerType.req.dto';

import {LockerTypeRepository} from './repository/locker-type.repository';

import {UserAfterAuth} from 'src/common/docorator/user.decorator';
import {UpdateLockerTypeReqDto} from './dto/updateLockerType.req.dto';

import {LockerTypeDocument} from './schemas/locker-type.schema';
import {LockerTypeResDto} from './dto/LockerType.res.dto';


@Injectable()
export class LockerTypeService {
  constructor(
    private readonly lockerTypeRepo: LockerTypeRepository,
  ) {}

  async createLockerType(user: UserAfterAuth, createLockerTypeDto: CreateLockerTypeReqDto): Promise<LockerTypeResDto> {
    /* 데이터 검증 필요
      - 동일한 유저 와 락카 네임이 있는경우
    */
    const existingLockerType = await this.lockerTypeRepo.findLockerTypeByName(user, createLockerTypeDto.name);
    if (existingLockerType !== null) {
      throw new ConflictException();
    }
    const createdLockerType = await this.lockerTypeRepo.createLockerType(user, createLockerTypeDto);
    return {
      _id: createdLockerType._id,
      userId: createdLockerType.userId,
      name: createdLockerType.name,
      quantity: createdLockerType.quantity,
      startNumber: createdLockerType.startNumber,
      exceptNumber: createdLockerType.exceptNumber,
      createdAt: createdLockerType.createdAt,
      updatedAt: createdLockerType.updatedAt,
    }
  }

  async updateLockerType(user: UserAfterAuth, lockerTypeId: string, updateLockerTypeDto: UpdateLockerTypeReqDto): Promise<LockerTypeResDto> {
    const getLockerType = await this.lockerTypeRepo.findLockerTypeByLockerId(lockerTypeId)
    if (getLockerType === null) {
      throw new NotFoundException();
    }
    if (getLockerType.userId !== user._id) {
      throw new UnauthorizedException();
    }
    if (getLockerType.name !== updateLockerTypeDto.name) {
      const existingLockerType = await this.lockerTypeRepo.findLockerTypeByName(user, updateLockerTypeDto.name);
      if (existingLockerType !== null) {
        throw new ConflictException();
      }
    }
    // 락카 삭제되었을 떄 조건 추가 필요
    const updatedLockerType = await this.lockerTypeRepo.updateLockerType(getLockerType, updateLockerTypeDto)
    return {
      _id: updatedLockerType._id,
      userId: updatedLockerType.userId,
      name: updatedLockerType.name,
      quantity: updatedLockerType.quantity,
      startNumber: updatedLockerType.startNumber,
      exceptNumber: updatedLockerType.exceptNumber,
      createdAt: updatedLockerType.createdAt,
      updatedAt: updatedLockerType.updatedAt,
    }
  }

  async findAllLockerTypes(userId: string): Promise<LockerTypeResDto[]> {
    const lockerTypes = await this.lockerTypeRepo.findLockerTypeByUserId(userId);

    return lockerTypes.map(lockerType => ({
      _id: lockerType._id,
      userId: lockerType.userId,
      name: lockerType.name,
      quantity: lockerType.quantity,
      startNumber: lockerType.startNumber,
      exceptNumber: lockerType.exceptNumber,
      createdAt: lockerType.createdAt,
      updatedAt: lockerType.updatedAt,
    }));
  }

  async findOneLockerType(userId: string, lockerTypeId: string): Promise<LockerTypeResDto> {
    const findedLockerType = await this.lockerTypeRepo.findOneLockerTypeByLockerId(lockerTypeId);
    if (userId !== findedLockerType.userId) {
      throw new UnauthorizedException();
    }
    return {
      _id: findedLockerType._id,
      userId: findedLockerType.userId,
      name: findedLockerType.name,
      quantity: findedLockerType.quantity,
      startNumber: findedLockerType.startNumber,
      exceptNumber: findedLockerType.exceptNumber,
      createdAt: findedLockerType.createdAt,
      updatedAt: findedLockerType.updatedAt,
    }
  }


  async deleteLockerType(userId: string, lockerTypeId: string): Promise<LockerTypeDocument> {
    const lockerType = await this.lockerTypeRepo.findOneLockerTypeByLockerId(lockerTypeId)
    if (!lockerType) {
      throw new NotFoundException();
    }
    if (lockerType.userId !== userId) {
      throw new UnauthorizedException();
    }
    return await this.lockerTypeRepo.deleteLockerType(lockerTypeId, lockerType);
  }
}
