import {ApiProperty} from "@nestjs/swagger";
import {Sex} from "../type";
import {IsEnum, IsNotEmpty, IsString, Length, Matches, MaxLength} from "class-validator";

export class CreateCustomerReqDto {


  @ApiProperty({required: true, example: '홍길동'})
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  name: string;

  @ApiProperty({required: true, example: '010-1111-1111'})
  @IsString()
  @IsNotEmpty()
  @Matches(/^010-\d{4}-\d{4}$/)
  @Length(11)
  phone: string;

  @ApiProperty({enum: Sex, example: Sex.None})
  @IsEnum(Sex)
  sex: Sex;


  @ApiProperty({example: '19920407'})
  @IsString()
  @IsNotEmpty()
  @Length(8)
  birth: string;


  @ApiProperty({example: "테스트 고객1"})
  @IsString()
  memo: string;

}
