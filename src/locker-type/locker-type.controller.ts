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

  @ApiOperation({summary: '전체 락카 타입 조회', description: `로그인 된 이용자의 전체 락카타입을 조회합니다.`})
  @ApiBearerAuth()
  @Get()
  async findAllLockerTypes(
    @User() { _id } : UserAfterAuth,
  ) {
    return await this.lockerTypeService.findAllLockerTypes(_id);
  }

  @ApiOperation({summary: '특정 락카 타입 조회', description: `로그인 된 이용자의 특정 락카 타입을 조회 합니다.`})
  @ApiBearerAuth()
  @ApiParam({name: 'lockerTypeId', description: '수정할 락카 타입의 ID', example: '8bdc986b-6394-4a22-8c0f-d9d9022d3e05'})
  @Get(':lockerTypeId')
  async findOneLockerType(
    @User() { _id } : UserAfterAuth,
    @Param('lockerTypeId') lockerTypeId: UUID
  ) {
    return await this.lockerTypeService.findOneLockerType(_id, lockerTypeId);
  }


  @ApiOperation({summary: '특정 락카 타입 삭제', description: `로그인 된 이용자의 특정 락카 타입을  삭제합니다.`})
  @ApiBearerAuth()
  @ApiParam({name: 'lockerTypeId', description: '삭제할 락카 타입의 ID', example: '8bdc986b-6394-4a22-8c0f-d9d9022d3e05'})
  @Delete(':lockerTypeId')
  async deleteLockerType(
    @User() { _id } : UserAfterAuth,
    @Param('lockerTypeId') lockerTypeId: UUID
    ) {
    return await this.lockerTypeService.deleteLockerType(_id, lockerTypeId);
  }
}
