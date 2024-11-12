import {ApiProperty, PartialType, PickType} from "@nestjs/swagger";
import {v4 as uuidv4} from 'uuid';

export class CreateLockerReqDto {

  @ApiProperty({type: uuidv4, required: true, example: 'd91c77fa-b84c-470b-b1ee-eec6c37517dd'})
  lockerTypeId: string;

  @ApiProperty({required: true, example: 10})
  lockerNumber: number;

  @ApiProperty({type: uuidv4, required: true, example: '0e3041a8-544d-4ec5-99b9-868fc517a233'})
  customerId: string;

}
// 수정이 락카 번호만 있는데 혹시 양도 변수로 전체 데이터 입력으로 둠
export class UpdateLockerDto extends PickType(CreateLockerReqDto, ['customerId', 'lockerNumber'] as const) {}

export class GetLockerByLockerTypeDto extends PickType(CreateLockerReqDto, ['lockerTypeId'] as const) {}


