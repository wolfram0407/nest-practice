import {LockerTypeService} from './../locker-type/locker-type.service';
import {LockerType} from './../locker-type/schemas/locker-type.schema';
import {BadRequestException, Injectable, NotFoundException, UnauthorizedException, ConflictException} from '@nestjs/common';

import {LockerRepository} from './repository/locker.repository';
import {CreateLockerReqDto, UpdateLockerDto} from './dto/locker.req.dto';
import {rejects} from 'assert';


@Injectable()
export class LockerService {

  constructor(
    private readonly lockerTypeService: LockerTypeService,
    private readonly lockerRepo: LockerRepository
  ) {}
  async createLocker(userId: string, createLockerDto: CreateLockerReqDto) {
    // 락카 타입 ID로 락카 정보 조회
    const getLockerType = await this.lockerTypeService.findOneLockerType(userId, createLockerDto.lockerTypeId);
    // 권한 확인
    if (getLockerType.userId !== userId) {
      throw new UnauthorizedException();
    }
    // 락카 번호 입력 확인
    if (getLockerType.startNumber > createLockerDto.lockerNumber || getLockerType.startNumber + getLockerType.quantity < createLockerDto.lockerNumber) {
      throw new BadRequestException();
    }
    // 락카 번호 중복 확인
    const existLocker = await this.lockerRepo.findOneLockerByLockerNumber(createLockerDto.lockerTypeId, createLockerDto.lockerNumber)
    if (!existLocker === false) {
      throw new BadRequestException();
    }
    // 등록
    return await this.lockerRepo.createLocker(userId, createLockerDto);
  }

  async findAllLockersByLockerTypeId(userId: string, lockerTypeId: string) {
    return await this.lockerRepo.findLockersByLockerTypeId(userId, lockerTypeId);
  }

  async findAllLockersByUserId(userId: string) {
    return await this.lockerRepo.findAllLockersByUserId(userId);
  }

  async updateLocker(userId: string, lockerId: string, updateLockerDto: UpdateLockerDto) {

    const checkLocker = await this.lockerRepo.findOneByLockerId(lockerId);
    if (!checkLocker) {
      throw new NotFoundException();
    }
    if (checkLocker.userId !== userId) {
      throw new UnauthorizedException();
    }
    if (
      checkLocker.lockerNumber !== updateLockerDto.lockerNumber ||
      checkLocker.customerId !== updateLockerDto.customerId
    ) {
      const checkConflictNumber = await this.lockerRepo.findOneLockerByLockerNumber(
        checkLocker.lockerTypeId, updateLockerDto.lockerNumber
      );
      if (!checkConflictNumber === false) {
        throw new ConflictException();
      }
      await this.lockerRepo.updateLocker(lockerId, updateLockerDto);
    }

    return `This action returns a  locker`;


  }
  async deleteLocker(userId: string, lockerId: string) {
    const findLocker = await this.lockerRepo.findOneByLockerId(lockerId);
    if (!findLocker) {
      throw new NotFoundException();
    }
    if (findLocker.userId !== userId) {
      throw new UnauthorizedException();
    }
    return await this.lockerRepo.deleteLocker(lockerId);
  }

}
