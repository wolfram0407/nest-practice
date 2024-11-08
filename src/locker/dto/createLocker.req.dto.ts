import {ApiProperty} from "@nestjs/swagger";
import {v4 as uuidv4} from 'uuid';

export class CreateLockerReqDto {

  @ApiProperty({type: uuidv4, required: true, example: '79bde7e3-130c-4b8b-a520-0fba89a81c18'})
  lockerTypeId: string;

  @ApiProperty({required: true, example: 10})
  lockerNumber: number;

  @ApiProperty({type: uuidv4, required: true, example: '0e3041a8-544d-4ec5-99b9-868fc517a233'})
  customerId: string;

}
