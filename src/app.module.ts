import {Module} from '@nestjs/common';

import {ConfigModule} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';

import configuration, {validationSchema} from './config/configuration';
import {AuthModule} from './auth/auth.module';
import {UsersModule} from './users/users.module';
import {LockerModule} from './locker/locker.module';
import {LockerTypeModule} from './locker-type/locker-type.module';
import {CustomerModule} from './customer/customer.module';
import { LockerInfoModule } from './locker-info/locker-info.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),

    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule,
    UsersModule,
    LockerModule,
    LockerTypeModule,
    CustomerModule,
    LockerInfoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
