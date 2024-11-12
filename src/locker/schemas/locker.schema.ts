import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {v4 as uuidv4} from 'uuid';


export type LockerDocument = Locker & Document;

@Schema()
export class Locker {
  @Prop({type: String, default: uuidv4})
  _id: string;

  @Prop({type: uuidv4, ref: 'LockerType', required: true})
  lockerTypeId: string;

  @Prop({type: Number, required: true})
  lockerNumber: number;

  @Prop({type: uuidv4, ref: 'User', required: true})
  customerId: string;

  // userId로 락카 조회를 많이 할 것 같다.
  @Prop({type: uuidv4, ref: 'User', required: true})
  userId: string;

  @Prop({type: Date, default: Date.now})
  createdAt: Date;

  @Prop({type: Date, default: Date.now})
  updatedAt: Date;

  @Prop({type: Date, default: null})
  deletedAt: Date;

}

export const lockerSchema = SchemaFactory.createForClass(Locker);