import {lockerTypeSchema} from './../locker-type/schemas/locker-type.schema';
import {Injectable} from '@nestjs/common';
import {CreateLockerTypeInfoReqDto} from './dto/createLockerTypeInfo.req.dto';
import {LockerTypeInfoRepository} from './repository/lockerTypeInfo.repository';
import {CreateLockerTypeInfo} from 'src/locker-type/interfaces/createLockerType.interface';

@Injectable()
export class LockerInfoService {
  constructor(
    private readonly lockerTypeInfoRepo: LockerTypeInfoRepository,
  ) {}
  async createLockerTypeInfo(lockerTypeId: string, createLockerTypeInfos: CreateLockerTypeInfo[]) {
    /* 락카 정보 중복 체크 필요 */
    return createLockerTypeInfos.map(async (createLockerTypeInfo) => {
      return await this.lockerTypeInfoRepo.createLockerInfo(lockerTypeId, createLockerTypeInfo);
    })
  }

  async getAllLockerTypeInfo(lockerTypeId: string) {
    return await this.lockerTypeInfoRepo.getAllLockerTypeInfoByLockerTypeId(lockerTypeId);
  }


  findAll() {
    return `This action returns all lockerInfo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lockerInfo`;
  }


  remove(id: number) {
    return `This action removes a #${id} lockerInfo`;
  }
}
