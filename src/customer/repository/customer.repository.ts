import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';

import {Injectable, NotFoundException} from '@nestjs/common';

import {UserAfterAuth} from 'src/common/decorator/user.decorator';
import {Customer, CustomerDocument} from '../schemas/customer.schema';
import {CreateCustomerReqDto} from '../dto/createCutomerReq';
import {UpdateCustomerReqDto} from '../dto/updateCustomerReq';


@Injectable()
export class CustomerRepository {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>
  ) {
  }
  async createCustomer(userId: string, createCustomerDto: CreateCustomerReqDto): Promise<CustomerDocument> {
    const newCustomer = new this.customerModel({
      userId,
      ...createCustomerDto,
    });
    return await newCustomer.save();
  }

  async findCustomerByPhoneNumber(userId: String, phoneNumber: String): Promise<CustomerDocument> {
    return await this.customerModel.findOne({
      userId,
      phone: phoneNumber,
      deletedAt: null
    }).exec();
  }
  async findCustomerByUserId(userId: String): Promise<CustomerDocument> {
    return await this.customerModel.findOne({
      userId,
      deletedAt: null
    }).exec();
  }


  async getAllCustomers(userId: string) {
    return await this.customerModel.find({
      userId,
      deletedAt: null
    }).exec();
  }

  async findOneCustomerById(customerId: string) {
    return await this.customerModel.findOne({
      _id: customerId
    }).exec();
  }

  async updateCustomer(customer: CustomerDocument, updateCustomerReqDto: UpdateCustomerReqDto) {
    customer.name = updateCustomerReqDto.name === customer.name ? customer.name : updateCustomerReqDto.name;
    customer.phone = updateCustomerReqDto.phone === customer.phone ? customer.phone : updateCustomerReqDto.phone;
    customer.sex = updateCustomerReqDto.sex === customer.sex ? customer.sex : updateCustomerReqDto.sex;
    customer.birth = updateCustomerReqDto.birth === customer.birth ? customer.birth : updateCustomerReqDto.birth;
    customer.memo = updateCustomerReqDto.memo === customer.memo ? customer.memo : updateCustomerReqDto.memo;
    customer.updatedAt = new Date();
    await customer.save();
    return customer;
  }

  async deleteCustomer(customer: CustomerDocument) {
    customer.deletedAt = new Date();
    await customer.save();
    return customer;
  }
}
