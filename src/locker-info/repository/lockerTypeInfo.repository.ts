
import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {LockerTypeInfo} from "../schemas/locker-info.schema";
import {Model} from 'mongoose';
import {CreateLockerTypeInfoReqDto} from "../dto/createLockerTypeInfo.req.dto";
import {CreateLockerTypeInfo} from "src/locker-type/interfaces/createLockerType.interface";



@Injectable()
export class LockerTypeInfoRepository {
  constructor(
    @InjectModel(LockerTypeInfo.name) private lockerTypeInfoModel: Model<LockerTypeInfo>
  ) {
  }
  async createLockerInfo(lockerTypeId: string, createLockerTypeInfo: CreateLockerTypeInfo) {
    const newLockerTypeInfo = new this.lockerTypeInfoModel({
      lockerTypeId,
      priceType: createLockerTypeInfo.priceType,
      securityPrice: createLockerTypeInfo.securityPrice,
      lockerPrice: createLockerTypeInfo.lockerPrice,
      lockerPeriod: createLockerTypeInfo.lockerPeriod,
    })
    return await newLockerTypeInfo.save();
  }

  async getAllLockerTypeInfoByLockerTypeId(lockerTypeId: string) {
    return await this.lockerTypeInfoModel.find({
      lockerTypeId,
      deletedAt: null
    }).exec();
  }

}