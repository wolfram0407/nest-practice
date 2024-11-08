import {PartialType} from '@nestjs/swagger';
import {CreateLockerReqDto} from './createLocker.req.dto';

export class UpdateLockerDto extends PartialType(CreateLockerReqDto) {}
