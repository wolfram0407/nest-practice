import {UpdateLockerTypeReqDto} from './../dto/updateLockerType.req.dto';

import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {LockerType, LockerTypeDocument, lockerTypeSchema} from '../schemas/locker-type.schema';
import {Injectable} from '@nestjs/common';
import {CreateLockerTypeReqDto} from '../dto/createLockerType.req.dto';
import {UserAfterAuth} from 'src/common/docorator/user.decorator';
import {UUID} from 'crypto';


@Injectable()
export class LockerTypeRepository {
  constructor(
    @InjectModel(LockerType.name) private lockerTypeModel: Model<LockerTypeDocument>
  ) {
  }
  // 새로운 유저 등록
  async createLockerType(user: UserAfterAuth, createLockerTypeDto: CreateLockerTypeReqDto) {
    // 새로운 LockerType 생성
    const newLockerType = new this.lockerTypeModel({
      name: createLockerTypeDto.name,
      quantity: createLockerTypeDto.quantity,
      startNumber: createLockerTypeDto.startNumber,
      exceptNumber: createLockerTypeDto.exceptNumber,
      userId: user._id,
    });
    return await newLockerType.save();
  }
  // 
  async findLockerTypeByName(user: UserAfterAuth, name: string) {
    return await this.lockerTypeModel.findOne({name, userId: user._id}).exec();
  }

  async findLockerTypeByLockerId(lockerTypeId: UUID) {
    return await this.lockerTypeModel.findOne({_id: lockerTypeId})
  }

  async updateLockerType(lockerType: LockerTypeDocument, updateLockerTypeReqDto: UpdateLockerTypeReqDto): Promise<LockerTypeDocument> {
    lockerType.name = updateLockerTypeReqDto.name ?? lockerType.name;
    lockerType.quantity = updateLockerTypeReqDto.quantity ?? lockerType.quantity;
    lockerType.startNumber = updateLockerTypeReqDto.startNumber ?? lockerType.startNumber;
    lockerType.exceptNumber = updateLockerTypeReqDto.exceptNumber ?? lockerType.exceptNumber;
    lockerType.updatedAt = new Date();
    await lockerType.save();
    return lockerType;
  }


}
