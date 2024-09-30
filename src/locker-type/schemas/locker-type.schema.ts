import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {v4 as uuidv4} from 'uuid';

export type LockerTypeDocument = LockerType & Document;

@Schema()
export class LockerType {

  @Prop({type: uuidv4, default: uuidv4})
  _id: string;

  @Prop({type: String, required: true})
  name: string;

  @Prop({type: String, required: true})
  quantity: number;

  @Prop({type: String, required: true})
  startNumber: number;

  @Prop({type: Array , required: true })
  exceptNumber: number[];

  @Prop({type: uuidv4, ref: 'User', required: true})
  userId: string;

  @Prop({type: Date, default: Date.now})
  createdAt: Date;

  @Prop({type: Date, default: Date.now})
  updatedAt: Date;

  @Prop({type: Date, default: null})
  deletedAt: Date;
}

export const lockerTypeSchema = SchemaFactory.createForClass(LockerType);
