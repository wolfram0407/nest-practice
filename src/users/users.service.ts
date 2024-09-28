import {Injectable, ConflictException, NotFoundException} from '@nestjs/common';

import {UserRepository} from './repository/user.repository';

import * as argon2 from 'argon2';
import {createUserReqDto} from './dto/createUser.req.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepo: UserRepository
  ) {
  }

  // 유저 생성 로직
  async createUser(dto: createUserReqDto) {
    // 이메일로 기존 유저가 존재하는지 확인
    const existingUser = await this.userRepo.findByEmail(dto.email);
    if (existingUser) {
      // 유저가 이미 존재하면 ConflictException 발생
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await argon2.hash(dto.password);

    // 새로운 유저 생성 및 저장
    return this.userRepo.create(dto, hashedPassword);
  }

  async findByEmail(email: string) {
    return await this.userRepo.findByEmail(email);
  }

  async findById(_id: string) {
    return await this.userRepo.findById(_id);
  }
}
