import {Injectable} from '@nestjs/common';
import {CreateCustomerDto} from './dto/createCutomerReq';
import {UpdateCustomerDto} from './dto/update-customer.dto';
import {UserAfterAuth} from 'src/common/docorator/user.decorator';


@Injectable()
export class CustomerService {

  create(user: UserAfterAuth, createCustomerDto: CreateCustomerDto) {
    console.log(user)
    console.log(createCustomerDto)
    return 'This action adds a new customer';
  }

  findAll() {
    return `This action returns all customer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
