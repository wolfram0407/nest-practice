import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {LockerType, LockerTypeDocument, lockerTypeSchema} from '../schemas/locker-type.schema';
import {Injectable, NotFoundException} from '@nestjs/common';

import {UserAfterAuth} from 'src/common/decorator/user.decorator';
import {CreateLockerTypeReqDto, UpdateLockerTypeReqDto} from '../dto/req.dto';


@Injectable()
export class LockerTypeRepository {
  constructor(
    @InjectModel(LockerType.name) private lockerTypeModel: Model<LockerTypeDocument>
  ) {
  }
  // 새로운 유저 등록
  async createLockerType(userId: string, createLockerTypeDto: CreateLockerTypeReqDto): Promise<LockerTypeDocument> {
    // 새로운 LockerType 생성
    const newLockerType = new this.lockerTypeModel({
      name: createLockerTypeDto.name,
      quantity: createLockerTypeDto.quantity,
      startNumber: createLockerTypeDto.startNumber,
      exceptNumber: createLockerTypeDto.exceptNumber ?? [],
      noticePeriod: createLockerTypeDto.noticePeriod ?? [],
      userId,
    });
    return await newLockerType.save();
  }
  // 
  async findLockerTypeByName(userId: string, name: string): Promise<LockerTypeDocument> {
    return await this.lockerTypeModel.findOne({name, userId, deletedAt: null}).exec();
  }

  async findOneLockerTypeByLockerId(lockerTypeId: string): Promise<LockerTypeDocument> {
    return await this.lockerTypeModel.findOne({
      _id: lockerTypeId,
      deletedAt: null
    }).exec();
  }

  async getAllLockerTypeByUserId(userId: string) {
    return await this.lockerTypeModel.find({
      userId,
      deletedAt: null
    }).exec();
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


  async deleteLockerType(lockerTypeId: string, lockerType: LockerTypeDocument): Promise<LockerTypeDocument> {
    lockerType.deletedAt = new Date();
    await lockerType.save();
    return lockerType;
  }

}
