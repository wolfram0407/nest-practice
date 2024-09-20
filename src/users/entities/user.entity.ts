import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/types';
import { v4 as uuidv4 } from 'uuid';

export type CatDocument = User & Document;

@Schema()
export class User {

  @Prop({ type: String, default: function genUUID() {
    return uuidv4()
  }})
  _id: string

  @Prop({type : String, required: true })
  email: string;

  @Prop({type : String, required: true })
  password: string;

  @Prop({type : String, required: true })
  name: string;

  @Prop({ type: String , enum : Role, default: Role.User })
  roles: string;

  @Prop({type : Date, default: Date.now })
  createdAt: Date;

  @Prop({type : Date, default: Date.now })
  updatedAt: Date;

  @Prop({ type: Date, default: null })
  deletedAt: Date;

  @Prop({ type: Date, default: null })
  lastLogin: Date;

}

export const userSchema = SchemaFactory.createForClass(User);

