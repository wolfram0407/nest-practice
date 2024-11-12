import {Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import {LockerService} from './locker.service';

import {ApiBearerAuth, ApiParam, ApiTags} from '@nestjs/swagger';
import {User, UserAfterAuth} from 'src/common/decorator/user.decorator';
import {CreateLockerReqDto} from './dto/locker.req.dto';

const exampleLockerTypeId = 'd91c77fa-b84c-470b-b1ee-eec6c37517dd';

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lockerService.findOne(+id);
  }



  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lockerService.remove(+id);
  }
}
