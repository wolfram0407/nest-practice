import {PartialType} from '@nestjs/swagger';
import {CreateCustomerDto} from './createCutomerReq';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
