
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {LockerType, LockerTypeDocument, lockerTypeSchema} from '../schemas/locker-type.schema';
import {Injectable} from '@nestjs/common';
import {CreateLockerTypeReqDto} from '../dto/createLockerType.req.dto';
import {UserAfterAuth} from 'src/common/docorator/user.decorator';


@Injectable()
export class LockerTypeRepository {
  constructor(
    @InjectModel(LockerType.name) private lockerTypeModel: Model<LockerTypeDocument>
  ) {
  }
  // 새로운 유저 등록
  async create(user: UserAfterAuth, createLockerTypeDto: CreateLockerTypeReqDto) {
    /* 데이터 검증 필요
    1. 동일한 유저 와 락카 네임이 있는경우
    */

    // 새로운 LockerType 생성
    const newLockerType = new this.lockerTypeModel({
      name: createLockerTypeDto.name,
      quantity: createLockerTypeDto.quantity,
      startNumber: createLockerTypeDto.startNumber,
      exceptNumber: createLockerTypeDto.exceptNumber,
      userId: user._id, // 현재 로그인한 유저의 _id를 사용
    });

    // 데이터베이스에 저장
    return await newLockerType.save();
  }

  // // 이메일로 유저 찾기(password 포함)
  // async findByEmail(email: string): Promise<User | null> {
  //   return this.userModel.findOne({email}).exec();
  // }

  // // _id 로 유저 검색
  // async findById(_id: string): Promise<User | null> {
  //   return await this.userModel
  //     .findOne({_id})
  //     .select('-password')
  //     .exec();
  // }


  // // 유저 삭제
  // async deleteById(id: string): Promise<LockerType | null> {
  //   return this.lockerTypeModel.findByIdAndDelete(id).exec();
  // }


}
