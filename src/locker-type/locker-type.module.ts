import {Module} from '@nestjs/common';
import {LockerTypeService} from './locker-type.service';
import {LockerTypeController} from './locker-type.controller';
import {MongooseModule} from '@nestjs/mongoose';
import {lockerTypeSchema, LockerType} from './schemas/locker-type.schema';
import {LockerTypeRepository} from './repository/locker-type.repository';


@Module({
  imports: [MongooseModule.forFeature([{name: LockerType.name, schema: lockerTypeSchema}])],
  controllers: [LockerTypeController],
  providers: [LockerTypeService, LockerTypeRepository],
  exports: [LockerTypeService]
})
export class LockerTypeModule {}
