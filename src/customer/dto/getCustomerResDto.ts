import {ApiProperty} from "@nestjs/swagger";
import {v4 as uuidv4} from 'uuid';
import {Sex} from "../type";

export class getCustomerResDto {

  @ApiProperty({type: uuidv4})
  _id: string;

  @ApiProperty({required: true})
  name: string;

  @ApiProperty({required: true})
  phone: string;

  @ApiProperty({required: true, enum: Sex})
  sex: Sex;

  @ApiProperty({required: true})
  birth: string;

  @ApiProperty({required: true})
  memo: string;

  @ApiProperty({type: uuidv4})
  userId: string;

  @ApiProperty({required: true})
  createdAt: Date;
  @ApiProperty({required: true})
  updatedAt: Date;
  @ApiProperty({required: true})
  deletedAt: Date;

}