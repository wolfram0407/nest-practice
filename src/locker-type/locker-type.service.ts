import {ConflictException, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {LockerTypeRepository} from './repository/locker-type.repository';

import {UserAfterAuth} from 'src/common/decorator/user.decorator';


import {LockerTypeDocument} from './schemas/locker-type.schema';
import {LockerTypeResDto} from './dto/LockerType.res.dto';
import {LockerInfoService} from 'src/locker-info/locker-info.service';

import {CreateLockerTypeReqDto, UpdateLockerTypeInfoReqDto, UpdateLockerTypeReqDto} from './dto/req.dto';


@Injectable()
export class LockerTypeService {
  constructor(
    private readonly lockerTypeRepo: LockerTypeRepository,
    private readonly lockerInfoService: LockerInfoService
  ) {}

  async createLockerType(userId: string, createLockerTypeDto: CreateLockerTypeReqDto) {
    /* 트랜젝션 추가 필요 */
    // 동일한 볼링장에서 락카 이름이 중복되는 경우 
    const existingLockerType = await this.lockerTypeRepo.findLockerTypeByName(userId, createLockerTypeDto.name);
    if (existingLockerType !== null) {
      throw new ConflictException();
    }

    const createdLockerType = await this.lockerTypeRepo.createLockerType(userId, createLockerTypeDto);
    const createdLockerTypeInfo = await this.lockerInfoService.createLockerTypeInfo(createdLockerType.id, createLockerTypeDto.lockerTypeInfo)
    // if(!createdLockerTypeInfo)

    if (!createdLockerType || !createdLockerTypeInfo) {
      throw new Error('Failed to create locker type or locker type info');
    }

    return {
      message: 'locker type successfully created',
      data: {
        statusValue: true,
      }
    }

  }
  // 전체 조회
  async getAllLockerTypes(userId: string) {
    const getLockerTypes = await this.lockerTypeRepo.getAllLockerTypeByUserId(userId);
    return await Promise.all(
      getLockerTypes.map(async (type) => {
        const lockerTypeInfo = await this.lockerInfoService.getAllLockerTypeInfo(type.id);
        return {
          _id: type._id,
          userId: type.userId,
          name: type.name,
          quantity: type.quantity,
          startNumber: type.startNumber,
          exceptNumber: type.exceptNumber,
          createdAt: type.createdAt,
          updatedAt: type.updatedAt,
          lockerTypeInfo,
        };
      })
    );
  }
  // 락카 타입 ID 로 조회 
  async findOneLockerType(userId: string, lockerTypeId: string) {


    const getLockerType = await this.lockerTypeRepo.getLockerTypeByLockerId(lockerTypeId);
    if (getLockerType === null) {
      throw new NotFoundException();
    }
    if (userId !== getLockerType.userId) {
      throw new UnauthorizedException();
    }
    const getLockerTypeInfo = await this.lockerInfoService.getAllLockerTypeInfo(lockerTypeId);
    if (getLockerTypeInfo === null) {
      throw new NotFoundException();
    }
    return {
      _id: getLockerType._id,
      userId: getLockerType.userId,
      name: getLockerType.name,
      quantity: getLockerType.quantity,
      startNumber: getLockerType.startNumber,
      exceptNumber: getLockerType.exceptNumber,
      createdAt: getLockerType.createdAt,
      updatedAt: getLockerType.updatedAt,
      getLockerTypeInfo,
    };
  }


  // 락카 타입 수정
  async updateLockerType(userId: string, lockerTypeId: string, updateLockerTypeDto: UpdateLockerTypeReqDto) { //:Promise<LockerTypeResDto> {
    const getLockerType = await this.lockerTypeRepo.findLockerTypeByLockerId(lockerTypeId);
    if (getLockerType === null) {
      throw new NotFoundException();
    }
    if (getLockerType.userId !== userId) {
      throw new UnauthorizedException();
    }
    if (getLockerType.name !== updateLockerTypeDto.name) {
      const existingLockerType = await this.lockerTypeRepo.findLockerTypeByName(userId, updateLockerTypeDto.name);
      if (existingLockerType !== null) {
        throw new ConflictException();
      }
    }
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

  async updateLockerTypeInfo(userId: string, lockerTypeId: string, updateLockerTypeInfoReqDto: UpdateLockerTypeInfoReqDto) {
    {
      console.log(updateLockerTypeInfoReqDto)

    }
  }


  async deleteLockerType(userId: string, lockerTypeId: string) {
    // const lockerType = await this.lockerTypeRepo.findOneLockerTypeByLockerId(lockerTypeId)
    // if (!lockerType) {
    //   throw new NotFoundException();
    // }
    // if (lockerType.userId !== userId) {
    //   throw new UnauthorizedException();
    // }
    // /* 락카가 남아있으면 삭제 불가 추가 필요 */
    // return await this.lockerTypeRepo.deleteLockerType(lockerTypeId, lockerType);
  }
}
