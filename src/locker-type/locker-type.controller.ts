
import {Controller, Get, Post, Body, Param, Delete, Put} from '@nestjs/common';
import {LockerTypeService} from './locker-type.service';
import {ApiBearerAuth, ApiExtraModels, ApiOperation, ApiParam, ApiTags} from '@nestjs/swagger';
import {User, UserAfterAuth} from 'src/common/decorator/user.decorator';

import {LockerTypeResDto} from './dto/LockerType.res.dto';
import {CreateLockerTypeReqDto, UpdateLockerTypeInfoReqDto, UpdateLockerTypeReqDto} from './dto/req.dto';


const exampleLockerTypeId = 'd91c77fa-b84c-470b-b1ee-eec6c37517dd';
const exampleLockerTypeInfoId = 'f5998924-beb0-4031-871d-3fad02e29b44'
@ApiTags('LockerType')

@ApiExtraModels(LockerTypeResDto)
@ApiBearerAuth()
@Controller('locker-type')
export class LockerTypeController {
  constructor(
    private readonly lockerTypeService: LockerTypeService
  ) {}

  @ApiOperation({summary: '락카 타입 등록', description: ``})
  @Post('locker-type')
  async CreateLockerType(
    @User() {_id}: UserAfterAuth,
    @Body() createLockerTypeDto: CreateLockerTypeReqDto) {
    return await this.lockerTypeService.createLockerType(_id, createLockerTypeDto);
  }

  @ApiOperation({summary: '전체 락카 타입 조회', description: `로그인 된 이용자의 전체 락카타입을 조회합니다.`})
  @Get()
  async getAllLockerTypes(
    @User() {_id}: UserAfterAuth,
  ) {
    return await this.lockerTypeService.getAllLockerTypes(_id);
  }

  @ApiOperation({summary: '특정 락카 타입 조회', description: `로그인 된 이용자의 특정 락카 타입을 조회 합니다.`})
  @ApiParam({name: 'lockerTypeId', description: '수정할 락카 타입의 ID', example: `${exampleLockerTypeId}`})
  @Get(':lockerTypeId')
  async findOneLockerType(
    @User() {_id}: UserAfterAuth,
    @Param('lockerTypeId') lockerTypeId: string
  ) {
    return await this.lockerTypeService.findOneLockerType(_id, lockerTypeId);
  }

  // 수정은 2개로 나눠서 진행
  // 1. 락카 타입만 수정
  // 2. 락카 정보만 수정

  @ApiOperation({summary: '락카 타입 수정', description: ``})
  @ApiParam({name: 'lockerTypeId', description: '수정할 락카 타입의 ID', example: `${exampleLockerTypeId}`})
  @Put(':lockerTypeId')
  async updateLockerType(
    @User() {_id}: UserAfterAuth,
    @Body() updateLockerTypeDto: UpdateLockerTypeReqDto,
    @Param('lockerTypeId') lockerTypeId: string
  ) {
    return await this.lockerTypeService.updateLockerType(_id, lockerTypeId, updateLockerTypeDto);;
  }

  @ApiOperation({summary: '락카 타입 정보 수정', description: ``})
  @ApiParam({name: 'lockerTypeInfoId', description: '수정할 락카 타입 정보 의 ID', example: `${exampleLockerTypeInfoId}`})
  @Put('info/:lockerTypeInfoId')
  async updateLockerTypeInfo(
    @User() {_id}: UserAfterAuth,
    @Body() updateLockerTypeInfoReqDto: UpdateLockerTypeInfoReqDto,
    @Param('lockerTypeInfoId') lockerTypeInfoId: string
  ) {

    return await this.lockerTypeService.updateLockerTypeInfo(_id, lockerTypeInfoId, updateLockerTypeInfoReqDto);;
  }

  @ApiOperation({summary: '특정 락카 타입 삭제', description: `로그인 된 이용자의 특정 락카 타입을  삭제합니다.`})
  @ApiParam({name: 'lockerTypeId', description: '삭제할 락카 타입의 ID', example: `${exampleLockerTypeId}`})
  @Delete(':lockerTypeId')
  async deleteLockerType(
    @User() {_id}: UserAfterAuth,
    @Param('lockerTypeId') lockerTypeId: string
  ) {
    return await this.lockerTypeService.deleteLockerType(_id, lockerTypeId);
  }
}
