import {Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import {LockerTypeService} from './locker-type.service';

import {UpdateLockerTypeDto} from './dto/update-locker-type.dto';
import {ApiBearerAuth, ApiOperation, ApiTags} from '@nestjs/swagger';
import {User, UserAfterAuth} from 'src/common/docorator/user.decorator';
import {CreateLockerTypeReqDto} from './dto/createLockerType.req.dto';

@ApiTags('LockerType')
@Controller('locker-type')
export class LockerTypeController {
  constructor(private readonly lockerTypeService: LockerTypeService) {}


  @ApiOperation({summary: '락카 타입 등록', description: ``})
  @ApiBearerAuth()
  @Post('create')
  create(
    @User() user: UserAfterAuth,
    @Body() createLockerTypeDto: CreateLockerTypeReqDto) {
    //console.log(createLockerTypeDto);
    const temp = this.lockerTypeService.createLockerType(user, createLockerTypeDto);
    return temp;
    //this.lockerTypeService.create(createLockerTypeDto);
  }

  @Get()
  findAll() {
    return this.lockerTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lockerTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLockerTypeDto: UpdateLockerTypeDto) {
    return this.lockerTypeService.update(+id, updateLockerTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lockerTypeService.remove(+id);
  }
}
