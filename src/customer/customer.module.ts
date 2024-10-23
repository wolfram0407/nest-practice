import {Module} from '@nestjs/common';
import {CustomerService} from './customer.service';
import {CustomerController} from './customer.controller';
import {MongooseModule} from '@nestjs/mongoose';
import {Customer, customerSchema} from './schemas/customer.schema';
import {CustomerRepository} from './repository/customer.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Customer.name, schema: customerSchema}])
  ],
  controllers: [CustomerController],
  providers: [CustomerService, CustomerRepository],
  exports: []
})
export class CustomerModule {}
