// src/cats/user.repository.ts
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.entity';
import { Injectable } from '@nestjs/common';
import { createUserReqDto } from 'src/auth/dto/createUserReqDto';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {

  }
 // 새로운 유저 등록
  async create(dto:createUserReqDto, hashedPassword: string): Promise<User> {
    const user = new this.userModel({
      email: dto.email,
      password: hashedPassword,
      name: dto.name,
      phone: dto.phone,
      roles: dto.role,
    });

    return user.save();
  }

  // 이메일로 유저 찾기
  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  // 모든 유저 찾기
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  // 유저 삭제
  async deleteById(id: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id).exec();
  }


}
