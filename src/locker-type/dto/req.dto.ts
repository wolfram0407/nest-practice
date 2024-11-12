
import {ApiProperty, PickType} from "@nestjs/swagger";
import {IsEnum, IsNotEmpty, IsNumber, IsOptional, MaxLength} from "class-validator";
import {PriceType} from "../enum/priceType.enum";
import {CreateLockerTypeInfo} from "../interfaces/createLockerType.interface";

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

  @ApiProperty({required: true, example: [1, 2, 4]})
  @IsNumber({}, {each: true})
  @IsOptional()
  exceptNumber: number[];

  @ApiProperty({required: true, example: [3]})
  @IsNumber({}, {each: true})
  noticePeriod: number[];

  @ApiProperty({
    required: true, example: [{
      priceType: PriceType.Month,
      securityPrice: 10000,
      lockerPrice: 20000,
      lockerPeriod: 12,
    }]
  })
  lockerTypeInfo: CreateLockerTypeInfo[];
}


export class UpdateLockerTypeReqDto extends PickType(CreateLockerTypeReqDto, ['name', 'quantity', 'startNumber', 'exceptNumber', 'noticePeriod'] as const) {}


export class UpdateLockerTypeInfoReqDto {
  @ApiProperty({required: true, example: PriceType.Month})
  @IsEnum(PriceType)
  priceType: PriceType;

  @ApiProperty({required: true, example: 10000})
  @IsNumber()
  securityPrice: number;

  @ApiProperty({required: true, example: 20000})
  @IsNumber()
  lockerPrice: number;

  @ApiProperty({required: true, example: 12})
  @IsNumber()
  lockerPeriod: number;
}
