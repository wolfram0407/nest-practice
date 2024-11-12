import {Module} from '@nestjs/common';
import {LockerService} from './locker.service';
import {LockerController} from './locker.controller';
import {MongooseModule} from '@nestjs/mongoose';
import {Locker, lockerSchema} from './schemas/locker.schema';

import {LockerTypeModule} from 'src/locker-type/locker-type.module';
import {LockerRepository} from './repository/locker.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Locker.name, schema: lockerSchema}
    ]),
    LockerTypeModule,
  ],
  controllers: [LockerController],
  providers: [LockerService, LockerRepository],
  exports: [LockerService],
})
export class LockerModule {}
