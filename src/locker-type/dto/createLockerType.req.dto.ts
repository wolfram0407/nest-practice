import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsUUID, MaxLength} from "class-validator";

export class CreateLockerTypeReqDto {

  @ApiProperty({required: true, example: '락카타입1'})
  @IsNotEmpty()
  @MaxLength(30)
  name: string;

  @ApiProperty({required: true, example: 100})
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({required: true, example: 1})
  @IsNotEmpty()
  startNumber: number;

  @ApiProperty({required: true, example: 1})
  @IsNotEmpty()
  exceptNumber: number[];

}


