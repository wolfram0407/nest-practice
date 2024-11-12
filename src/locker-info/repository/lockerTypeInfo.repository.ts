
import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {LockerTypeInfo} from "../schemas/locker-info.schema";
import {Model} from 'mongoose';
import {CreateLockerTypeInfoReqDto} from "../dto/createLockerTypeInfo.req.dto";
import {CreateLockerTypeInfo} from "src/locker-type/interfaces/createLockerType.interface";
import {UpdateLockerTypeInfoReqDto} from "src/locker-type/dto/req.dto";



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

  async getFindOneLockerTypeInfoById(lockerTypeInfoId: string) {
    return await this.lockerTypeInfoModel.findOne({
      _id: lockerTypeInfoId
    })
  }

  async updateLockerTypeInfo(lockerTypeInfoId: string, updateLockerTypeInfoReqDto: UpdateLockerTypeInfoReqDto) {
    return await this.lockerTypeInfoModel.updateOne(
      {_id: lockerTypeInfoId},
      {
        $set: {
          priceType: updateLockerTypeInfoReqDto.priceType,
          securityPrice: updateLockerTypeInfoReqDto.securityPrice,
          lockerPrice: updateLockerTypeInfoReqDto.lockerPrice,
          lockerPeriod: updateLockerTypeInfoReqDto.lockerPeriod,
        }
      })
  }

  async deleteLockerTypeInfo(lockerTypeId: string) {
    const deletedTime = new Date();
    const result = await this.lockerTypeInfoModel.updateMany(
      {lockerTypeId},
      {$set: {deletedTime}}
    );
    return result
  }
}