import {CreateLockerDto} from './../locker/dto/create-locker.dto';
import {Controller, Get, Post, Body, Patch, Param, Delete, Put, Req, Query} from '@nestjs/common';
import {LockerTypeService} from './locker-type.service';

import {UpdateLockerTypeReqDto} from './dto/updateLockerType.req.dto';
import {ApiBearerAuth, ApiOperation, ApiParam, ApiTags} from '@nestjs/swagger';
import {User, UserAfterAuth} from 'src/common/docorator/user.decorator';
import {CreateLockerTypeReqDto} from './dto/createLockerType.req.dto';
import {UUID} from 'crypto';

@ApiTags('LockerType')
@Controller('locker-type')
export class LockerTypeController {
  constructor(private readonly lockerTypeService: LockerTypeService) {}


  @ApiOperation({summary: '락카 타입 등록', description: ``})
  @ApiBearerAuth()
  @Post('create')
  async CreateLockerType(
    @User() user: UserAfterAuth,
    @Body() createLockerTypeDto: CreateLockerTypeReqDto) {
    return await this.lockerTypeService.createLockerType(user, createLockerTypeDto);;
  }

  @ApiOperation({summary: '락카 타입 수정', description: ``})
  @ApiParam({name: 'lockerTypeId', description: '수정할 락카 타입의 ID', example: '8bdc986b-6394-4a22-8c0f-d9d9022d3e05'})
  @ApiBearerAuth()
  @Put('update/:lockerTypeId')
  async updateLockerType(
    @User() user: UserAfterAuth,
    @Body() updateLockerTypeDto: UpdateLockerTypeReqDto,
    @Param('lockerTypeId') lockerTypeId: UUID
  ) {

    return await this.lockerTypeService.updateLockerType(user, lockerTypeId, updateLockerTypeDto);;
  }

  @Get()
  findAll() {
    return this.lockerTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lockerTypeService.findOne(+id);
  }



  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lockerTypeService.remove(+id);
  }
}
