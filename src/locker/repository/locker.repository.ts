import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';

import {Injectable, NotFoundException} from '@nestjs/common';
import {Locker, LockerDocument} from '../schemas/locker.schema';
import {CreateLockerReqDto, UpdateLockerDto} from '../dto/locker.req.dto';


@Injectable()
export class LockerRepository {
  constructor(
    @InjectModel(Locker.name) private customerModel: Model<LockerDocument>
  ) {
  }

  async findOneLockerByLockerNumber(lockerTypeId: string, lockerNumber: number) {
    const result = await this.customerModel.findOne({
      lockerTypeId,
      lockerNumber,
      deletedAt: null
    })
    return result
  }


  async createLocker(userId: string, createLockerDto: CreateLockerReqDto) {
    const newLocker = new this.customerModel({
      userId,
      ...createLockerDto,
    });
    return await newLocker.save();
  }

  async findLockersByLockerTypeId(userId: string, lockerTypeId: string) {
    const findAllLockersByLockerTypeId = await this.customerModel.find({
      userId,
      lockerTypeId,
      deletedAt: null
    })
      .sort({
        lockerNumber: 1
      });
    return findAllLockersByLockerTypeId;
  }

  async findAllLockersByUserId(userId: string) {
    const lockers = await this.customerModel.find({
      userId,
      deletedAt: null
    })
      .sort({
        lockerTypeId: 1,
        lockerNumber: 1
      });
    return lockers;
  }

  async findOneByLockerId(lockerId: string) {
    return await this.customerModel.findOne({
      _id: lockerId,
      deletedAt: null
    })
  }

  async updateLocker(lockerId: string, updateLockerDto: UpdateLockerDto) {

    return await this.customerModel.updateOne(
      {_id: lockerId},
      {
        $set: {
          customerId: updateLockerDto.customerId,
          lockerNumber: updateLockerDto.lockerNumber,
        }
      }
    )
  }
}
