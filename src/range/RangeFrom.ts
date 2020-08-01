import { Range, RangeDirection } from "./Range";

export class RangeFrom extends Range {
  static from(
    start: number,
    direction: RangeDirection = RangeDirection.Forward
  ) {
    return new RangeFrom(start, direction);
  }

  constructor(
    start: number,
    direction: RangeDirection = RangeDirection.Forward
  ) {
    if (direction === RangeDirection.Forward) {
      super(start, Infinity);
    } else {
      super(start, -Infinity);
    }
  }
}

export const rangeFrom = RangeFrom.from;
