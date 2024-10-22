import {ConflictException, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {CreateCustomerReqDto} from './dto/createCutomerReq';

import {UserAfterAuth} from 'src/common/docorator/user.decorator';
import {CustomerRepository} from './repository/customer.repository';
import {Customer} from './schemas/customer.schema';
import {getCustomerResDto} from './dto/getCustomerResDto';
import {UpdateCustomerReqDto} from './dto/updateCustomerReq';



@Injectable()
export class CustomerService {
  constructor(
    private readonly customerRepo: CustomerRepository
  ) {}

  async createCustomer(user: UserAfterAuth, createCustomerDto: CreateCustomerReqDto): Promise<Customer> {
    const existingCustomer = await this.customerRepo.findCustomerByUserId(user._id, createCustomerDto.phone);
    if (existingCustomer !== null) {
      throw new ConflictException();
    }
    return await this.customerRepo.createCustomer(user._id, createCustomerDto);
  }

  async getAllCustomers(userId: string): Promise<getCustomerResDto[]> {
    return await this.customerRepo.getAllCustomers(userId);
  }

  async findOneCustomerById(userId: string, customerId: string) {
    const findCustomer = await this.customerRepo.findOneCustomerById(customerId);
    if (userId !== findCustomer.userId) {
      throw new UnauthorizedException();
    }
    return findCustomer;
  }

  async updateCustomer(userId: string, customerId: string, updateCustomerReqDto: UpdateCustomerReqDto) {
    const getCustomer = await this.customerRepo.findOneCustomerById(customerId);
    if (getCustomer === null) {
      throw new NotFoundException();
    }
    if (getCustomer.userId !== userId) {
      throw new UnauthorizedException();
    }
    return await this.customerRepo.updateCustomer(getCustomer, updateCustomerReqDto);
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
