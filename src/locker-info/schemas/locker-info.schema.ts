import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {PriceType} from 'src/locker-type/enum/priceType.enum';

import {v4 as uuidv4} from 'uuid';

export type LockerTypeInfoDocument = LockerTypeInfo & Document;


@Schema()
export class LockerTypeInfo {

  @Prop({type: uuidv4, default: uuidv4})
  _id: string;

  @Prop({type: String, enum: PriceType, default: PriceType.Month})
  priceType: PriceType

  @Prop({type: Number, required: true})
  securityPrice: Number;

  @Prop({type: Number, required: true})
  lockerPrice: Number;

  @Prop({type: Number, required: true})
  lockerPeriod: Number;

  @Prop({type: uuidv4, ref: 'LockerType', required: true})
  lockerTypeId: string;

  @Prop({type: Date, default: Date.now})
  createdAt: Date;

  @Prop({type: Date, default: Date.now})
  updatedAt: Date;

  @Prop({type: Date, default: null})
  deletedAt: Date;

}

export const lockerTypeInfoSchema = SchemaFactory.createForClass(LockerTypeInfo);