import {ApiProperty, PickType} from "@nestjs/swagger";
import {v4 as uuidv4} from 'uuid';


export class CreateCustomerResDto {

  @ApiProperty({type: uuidv4, required: true, example: '24cfc3ad-a84d-4a5c-a4b7-fdf4dc9af1f4'})
  _id: string;

}