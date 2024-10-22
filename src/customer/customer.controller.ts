import {Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import {CustomerService} from './customer.service';
import {CreateCustomerDto} from './dto/createCutomerReq';
import {UpdateCustomerDto} from './dto/update-customer.dto';
import {ApiBearerAuth, ApiOperation, ApiTags} from '@nestjs/swagger';
import {User, UserAfterAuth} from 'src/common/docorator/user.decorator';

@ApiTags('customer')

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @ApiOperation({summary: '고객 등록', description: ``})
  @ApiBearerAuth()
  @Post('create')
  create(
    @User() user: UserAfterAuth,
    @Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(user, createCustomerDto);
  }

  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(+id);
  }
}
