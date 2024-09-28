import {Injectable} from '@nestjs/common';
import {CreateLockerTypeReqDto} from './dto/createLockerType.req.dto';
import {UpdateLockerTypeDto} from './dto/update-locker-type.dto';
import {LockerTypeRepository} from './repository/locker-type.repository';

import {UserAfterAuth} from 'src/common/docorator/user.decorator';


@Injectable()
export class LockerTypeService {
  constructor(
    private readonly lockerTypeRepo: LockerTypeRepository,
  ) {}


  async createLockerType(user: UserAfterAuth, createLockerTypeDto: CreateLockerTypeReqDto) {

    return await this.lockerTypeRepo.create(user, createLockerTypeDto)

  }

  findAll() {
    return `This action returns all lockerType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lockerType`;
  }

  update(id: number, updateLockerTypeDto: UpdateLockerTypeDto) {
    return `This action updates a #${id} lockerType`;
  }

  remove(id: number) {
    return `This action removes a #${id} lockerType`;
  }
}
