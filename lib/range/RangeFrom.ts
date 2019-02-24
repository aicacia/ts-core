import { IIterator } from "../iter";
import { Range } from "./Range";

export class RangeFrom extends Range implements IIterator<number> {
  static from(start: number) {
    return new RangeFrom(start);
  }

  constructor(start: number) {
    super(start, Infinity);
  }
}

export const rangeFrom = RangeFrom.from;
