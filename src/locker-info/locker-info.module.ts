import {Module} from '@nestjs/common';
import {LockerInfoService} from './locker-info.service';
import {MongooseModule} from '@nestjs/mongoose';
import {LockerTypeInfo, lockerTypeInfoSchema} from './schemas/locker-info.schema';
import {LockerTypeInfoRepository} from './repository/lockerTypeInfo.repository';

@Module({
  imports: [MongooseModule.forFeature([
    {name: LockerTypeInfo.name, schema: lockerTypeInfoSchema}
  ])],
  providers: [
    LockerInfoService,
    LockerTypeInfoRepository,
  ],
  exports: [LockerInfoService]
})
export class LockerInfoModule {}
