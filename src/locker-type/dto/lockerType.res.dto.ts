import {ApiProperty} from "@nestjs/swagger";
import {v4 as uuidv4} from 'uuid';

export class LockerTypeResDto {
  @ApiProperty({type: uuidv4})
  _id : string;
  @ApiProperty({required: true})
  name: string;
  @ApiProperty({required: true})
  quantity: number;
  @ApiProperty({required: true})
  startNumber: number;
  @ApiProperty({required: true, type: [Number]})
  exceptNumber: number[];
  @ApiProperty({type: uuidv4})
  userId : string;
  @ApiProperty({required: true})
  createdAt : Date;
  @ApiProperty({required: true})
  updatedAt : Date;

}