import { Range, RangeDirection } from "./Range";
export class RangeFrom extends Range {
    static from(start, direction = RangeDirection.Forward) {
        return new RangeFrom(start, direction);
    }
    constructor(start, direction = RangeDirection.Forward) {
        if (direction === RangeDirection.Forward) {
            super(start, Infinity);
        }
        else {
            super(start, -Infinity);
        }
    }
}
export const rangeFrom = RangeFrom.from;
