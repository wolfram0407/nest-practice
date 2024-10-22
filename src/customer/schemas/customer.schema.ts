import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {v4 as uuidv4} from 'uuid';
import {Sex} from '../type';


export type CustomerDocument = Customer & Document;

@Schema()
export class Customer {

  @Prop({type: String, default: uuidv4})
  _id: string;

  @Prop({type: String, required: true})
  name: string;

  @Prop({type: String, required: true, unique: true})
  phone: string;

  @Prop({type: String, enum: Sex, default: Sex.None})
  sex: Sex;

  @Prop({type: String})
  birth: string;

  @Prop({type: String})
  memo: string;

  @Prop({type: uuidv4, ref: 'User', required: true})
  userId: string;

  @Prop({type: Date, default: Date.now})
  createdAt: Date;

  @Prop({type: Date, default: Date.now})
  updatedAt: Date;

  @Prop({type: Date, default: null})
  deletedAt: Date;
}

export const customerSchema = SchemaFactory.createForClass(Customer);