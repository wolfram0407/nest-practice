import {PriceType} from "../enum/priceType.enum";

export interface CreateLockerTypeInfo {
  priceType: PriceType;
  securityPrice: number;
  lockerPrice: number;
  lockerPeriod: number;
  lockerTypeId: string;
};