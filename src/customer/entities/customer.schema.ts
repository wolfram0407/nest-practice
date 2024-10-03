import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

import {v4 as uuidv4} from 'uuid';
import {Sex} from '../type';


export type LockerTypeDocument = Customer & Document;

@Schema()
export class Customer {

  @Prop({type: String, default: uuidv4})
  _id: string;

  @Prop({type: String, required: true})
  name: Number;

  @Prop({type: String, required: true})
  phone: String;

  @Prop({type: String, enum: Sex, default: Sex.None})
  sex: string;

  @Prop({type: String})
  birth: string;

  @Prop({type: String})
  memo: string;

  @Prop({type: Date, default: Date.now})
  createdAt: Date;

  @Prop({type: Date, default: Date.now})
  updatedAt: Date;

  @Prop({type: Date, default: null})
  deletedAt: Date;
}

export const customerSchema = SchemaFactory.createForClass(Customer);