import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './cats/cats.module';

import configuration, { validationSchema } from './config/configuration';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LockerModule } from './locker/locker.module';
import { LockerTypeModule } from './locker-type/locker-type.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),

    MongooseModule.forRoot(process.env.MONGODB_URI),
    CatsModule,
    AuthModule,
    UsersModule,
    LockerModule,
    LockerTypeModule,
    CustomerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
