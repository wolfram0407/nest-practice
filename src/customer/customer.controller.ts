import {Controller, Get, Post, Body, Patch, Param, Delete, Put} from '@nestjs/common';
import {CustomerService} from './customer.service';
import {CreateCustomerReqDto} from './dto/createCutomerReq';

import {ApiBearerAuth, ApiConflictResponse, ApiCreatedResponse, ApiExtraModels, ApiOperation, ApiParam, ApiTags} from '@nestjs/swagger';
import {User, UserAfterAuth} from 'src/common/docorator/user.decorator';
import {CreateCustomerResDto} from './dto/createCutomerRes';
import {getCustomerResDto} from './dto/getCustomerResDto';
import {ApiPostArrayResponse, ApiPostResponse} from 'src/common/docorator/swagger.decorator';
import {UpdateCustomerReqDto} from './dto/updateCustomerReq';


const exampleCustomerId = '20fcbddb-3089-41a2-a9d2-dfc70b12ea32';

@ApiTags('customer')
@ApiExtraModels(CreateCustomerResDto, getCustomerResDto)
@ApiBearerAuth()
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @ApiOperation({summary: '볼링장 고객 등록', description: ``})
  @ApiCreatedResponse({description: '고객을 생성한다', type: CreateCustomerResDto})
  @ApiConflictResponse({description: '동일한 고객이 존재합니다'})
  @Post('create')
  async createCustomer(
    @User() user: UserAfterAuth,
    @Body() createCustomerDto: CreateCustomerReqDto): Promise<CreateCustomerResDto> {
    const newCustomer = await this.customerService.createCustomer(user, createCustomerDto);
    return {
      _id: newCustomer._id,
    }
  }

  @ApiOperation({summary: '볼링장 회원 전체 조회', description: ``})
  @ApiPostArrayResponse(getCustomerResDto)
  @Get('')
  async getAllCustomers(
    @User() {_id}: UserAfterAuth,
  ): Promise<getCustomerResDto[]> {
    return this.customerService.getAllCustomers(_id);
  }

  @ApiOperation({summary: '볼링장의 특정 회원을 조회합니다.', description: ``})
  @ApiPostResponse(getCustomerResDto)
  @ApiParam({name: 'customerId', description: '수정할 락카 타입의 ID', example: `${exampleCustomerId}`})
  @Get(':customerId')
  async findOneCustomerById(
    @User() {_id}: UserAfterAuth,
    @Param('customerId') customerId: string
  ) {
    return this.customerService.findOneCustomerById(_id, customerId);
  }

  @ApiOperation({summary: '락카 타입 수정', description: ``})
  @ApiParam({name: 'customerId', description: '수정할 락카 타입의 ID', example: `${exampleCustomerId}`})
  @Put(':customerId')
  async updateCustomer(
    @User() {_id}: UserAfterAuth,
    @Param('customerId') customerId: string,
    @Body() updateCustomerReqDto: UpdateCustomerReqDto
  ) {
    return await this.customerService.updateCustomer(_id, customerId, updateCustomerReqDto)
  }


  @ApiOperation({summary: '특정 유저를 삭제', description: `로그인 된 이용자의 특정 락카 타입을  삭제합니다.`})
  @Delete(':id')
  remove(@Param('id') id: string) {
    /*
    1. locker에 등록되어 있는지 확인
    2. 등록되어있으면 삭제 불가
    3. 등록되어 있지 않으면 삭제 
    */
    return this.customerService.remove(+id);
  }
}
