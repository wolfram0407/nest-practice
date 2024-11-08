import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber, IsString, IsUUID, Length, Matches, MaxLength} from "class-validator";
import {v4 as uuidv4} from 'uuid';

export class CreateLcokerReqDto {

  @ApiProperty({required: true, example: '락카타입1'})
  @IsNotEmpty()
  @MaxLength(30)
  lockerTypeName: string;

  @ApiProperty({required: true, example: 1})
  @IsNotEmpty()
  @IsNumber()
  lockerNumber: number;


  @ApiProperty({required: true, example: '홍길동'})
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  customerName: string;


  @ApiProperty({required: true, example: '010-1111-1111'})
  @IsString()
  @IsNotEmpty()
  @Matches(/^010-\d{4}-\d{4}$/)
  @Length(11)
  customerPhone: string;


  @ApiProperty({example: "테스트 고객1"})
  @IsString()
  memo: string;



}