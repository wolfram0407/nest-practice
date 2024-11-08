import {Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import {LockerService} from './locker.service';
import {CreateLockerReqDto} from './dto/createLocker.req.dto';
import {UpdateLockerDto} from './dto/update-locker.dto';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {User, UserAfterAuth} from 'src/common/decorator/user.decorator';

@ApiTags('locker')
@ApiBearerAuth()

@Controller('locker')
export class LockerController {
  constructor(
    private readonly lockerService: LockerService
  ) {}

  @Post()
  create(
    @User() {_id}: UserAfterAuth,
    @Body() createLockerDto: CreateLockerReqDto
  ) {
    return this.lockerService.createLocker(_id, createLockerDto);
  }

  @Get()
  findAll() {
    return this.lockerService.findAll();
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
