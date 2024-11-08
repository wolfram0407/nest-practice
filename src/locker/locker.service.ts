import {Injectable} from '@nestjs/common';
import {CreateLockerReqDto} from './dto/createLocker.req.dto';


@Injectable()
export class LockerService {
  createLocker(userId: string, createLockerDto: CreateLockerReqDto) {
    return 'This action adds a new locker';
  }

  findAll() {
    return `This action returns all locker`;
  }

  findOne(id: number) {
    return `This action returns a #${id} locker`;
  }


  remove(id: number) {
    return `This action removes a #${id} locker`;
  }
}
