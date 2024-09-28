import {PartialType} from '@nestjs/swagger';
import {CreateLockerTypeReqDto} from './createLockerType.req.dto';

export class UpdateLockerTypeDto extends PartialType(CreateLockerTypeReqDto) {}
