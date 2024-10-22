import {Module} from '@nestjs/common';
import {CustomerService} from './customer.service';
import {CustomerController} from './customer.controller';
import {MongooseModule} from '@nestjs/mongoose';
import {Customer, customerSchema} from './entities/customer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Customer.name, schema: customerSchema}])
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: []
})
export class CustomerModule {}
