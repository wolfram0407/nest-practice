import {ApiProperty, PickType} from "@nestjs/swagger";
import {CreateLockerTypeReqDto} from "src/locker-type/dto/req.dto";

import {v4 as uuidv4} from 'uuid';

export class CreateLockerTypeInfoReqDto extends PickType(CreateLockerTypeReqDto, ['lockerTypeInfo'] as const) {

  @ApiProperty({type: uuidv4, required: true, example: '79bde7e3-130c-4b8b-a520-0fba89a81c18'})
  lockerTypeId: string;

}