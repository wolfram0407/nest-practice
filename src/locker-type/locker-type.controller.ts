
import {Controller, Get, Post, Body, Param, Delete, Put} from '@nestjs/common';
import {LockerTypeService} from './locker-type.service';

import {UpdateLockerTypeReqDto} from './dto/updateLockerType.req.dto';
import {ApiBearerAuth, ApiExtraModels, ApiOperation, ApiParam, ApiTags} from '@nestjs/swagger';
import {User, UserAfterAuth} from 'src/common/docorator/user.decorator';
import {CreateLockerTypeReqDto} from './dto/createLockerType.req.dto';

import {LockerTypeDocument} from './schemas/locker-type.schema';
import {LockerTypeResDto} from './dto/LockerType.res.dto';
import {ApiPostArrayResponse, ApiPostResponse} from 'src/common/docorator/swagger.decorator';

const exampleLockerTypeId = '1d4bb1c7-9fd8-4be7-9bab-1dc7121864a5';

@ApiTags('LockerType')
@ApiExtraModels(LockerTypeResDto)
@Controller('locker-type')
export class LockerTypeController {
  constructor(private readonly lockerTypeService: LockerTypeService) {}

  @ApiOperation({summary: '락카 타입 등록', description: ``})
  @ApiPostResponse(LockerTypeResDto)
  @ApiBearerAuth()
  @Post('create')
  async CreateLockerType(
    @User() user: UserAfterAuth,
    @Body() createLockerTypeDto: CreateLockerTypeReqDto): Promise<LockerTypeResDto> {
    return await this.lockerTypeService.createLockerType(user, createLockerTypeDto);;
  }

  @ApiOperation({summary: '락카 타입 수정', description: ``})
  @ApiPostResponse(LockerTypeResDto)
  @ApiParam({name: 'lockerTypeId', description: '수정할 락카 타입의 ID', example: `${exampleLockerTypeId}`})
  @ApiBearerAuth()
  @Put('update/:lockerTypeId')
  async updateLockerType(
    @User() user: UserAfterAuth,
    @Body() updateLockerTypeDto: UpdateLockerTypeReqDto,
    @Param('lockerTypeId') lockerTypeId: string
  ): Promise<LockerTypeResDto> {

    return await this.lockerTypeService.updateLockerType(user, lockerTypeId, updateLockerTypeDto);;
  }

  @ApiOperation({summary: '전체 락카 타입 조회', description: `로그인 된 이용자의 전체 락카타입을 조회합니다.`})
  @ApiPostArrayResponse(LockerTypeResDto)
  @ApiBearerAuth()
  @Get()
  async findAllLockerTypes(
    @User() {_id}: UserAfterAuth,
  ): Promise<LockerTypeResDto[]> {
    return await this.lockerTypeService.findAllLockerTypes(_id);
  }

  @ApiOperation({summary: '특정 락카 타입 조회', description: `로그인 된 이용자의 특정 락카 타입을 조회 합니다.`})
  @ApiPostResponse(LockerTypeResDto)
  @ApiBearerAuth()
  @ApiParam({name: 'lockerTypeId', description: '수정할 락카 타입의 ID', example: `${exampleLockerTypeId}`})
  @Get(':lockerTypeId')
  async findOneLockerType(
    @User() {_id}: UserAfterAuth,
    @Param('lockerTypeId') lockerTypeId: string
  ): Promise<LockerTypeResDto> {
    return await this.lockerTypeService.findOneLockerType(_id, lockerTypeId);
  }


  @ApiOperation({summary: '특정 락카 타입 삭제', description: `로그인 된 이용자의 특정 락카 타입을  삭제합니다.`})
  @ApiPostResponse(LockerTypeResDto)
  @ApiBearerAuth()
  @ApiParam({name: 'lockerTypeId', description: '삭제할 락카 타입의 ID', example: `${exampleLockerTypeId}`})
  @Delete(':lockerTypeId')
  async deleteLockerType(
    @User() {_id}: UserAfterAuth,
    @Param('lockerTypeId') lockerTypeId: string
  ): Promise<LockerTypeDocument> {
    return await this.lockerTypeService.deleteLockerType(_id, lockerTypeId);
  }
}
