import {Controller, Get, Post, Body, Patch, Param, Delete, Put} from '@nestjs/common';
import {LockerService} from './locker.service';

import {ApiBearerAuth, ApiParam, ApiTags} from '@nestjs/swagger';
import {User, UserAfterAuth} from 'src/common/decorator/user.decorator';
import {CreateLockerReqDto, UpdateLockerDto} from './dto/locker.req.dto';

const exampleLockerTypeId = 'd91c77fa-b84c-470b-b1ee-eec6c37517dd';
const exampleLockerId = '8bc49a61-8053-4729-9483-1aef8fa18c2d';
@ApiTags('locker')
@ApiBearerAuth()

@Controller('locker')
export class LockerController {
  constructor(
    private readonly lockerService: LockerService
  ) {}

  @Post()
  createLocker(
    @User() {_id}: UserAfterAuth,
    @Body() createLockerDto: CreateLockerReqDto
  ) {
    return this.lockerService.createLocker(_id, createLockerDto);
  }

  @ApiParam({name: 'lockerTypeId', description: '조회할 락카타입의 ID', example: `${exampleLockerTypeId}`})
  @Get('/:lockerTypeId')
  async findAllLockersByLockerTypeId(
    @User() {_id}: UserAfterAuth,
    @Param('lockerTypeId') lockerTypeId: string
  ) {
    return this.lockerService.findAllLockersByLockerTypeId(_id, lockerTypeId);
  }


  @Get('/')
  async findAllLockersByUserId(
    @User() {_id}: UserAfterAuth,
  ) {
    return this.lockerService.findAllLockersByUserId(_id);
  }

  @ApiParam({name: 'lockerId', description: '수정할 락카의 ID', example: `${exampleLockerId}`})
  @Put('/:lockerId')
  async updateLocker(
    @User() {_id}: UserAfterAuth,
    @Param('lockerId') lockerId: string,
    @Body() updateLockerDto: UpdateLockerDto
  ) {
    return this.lockerService.updateLocker(_id, lockerId, updateLockerDto);
  }


  @ApiParam({name: 'lockerId', description: '수정할 락카의 ID', example: `${exampleLockerId}`})
  @Delete('/:lockerId')
  async deleteLocker(
    @User() {_id}: UserAfterAuth,
    @Param('lockerId') lockerId: string,
  ) {
    return this.lockerService.deleteLocker(_id, lockerId);
  }
}
