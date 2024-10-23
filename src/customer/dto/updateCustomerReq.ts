import {PartialType} from "@nestjs/swagger"
import {CreateCustomerReqDto} from "./createCutomerReq"


export class UpdateCustomerReqDto extends PartialType(CreateCustomerReqDto) {

}