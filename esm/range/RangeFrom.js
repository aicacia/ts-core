import { Range, RangeDirection } from "./Range";
export class RangeFrom extends Range {
    static from(start, direction = RangeDirection.Forward, step = 1) {
        return new RangeFrom(start, direction, step);
    }
    constructor(start, direction = RangeDirection.Forward, step = 1) {
        if (direction === RangeDirection.Forward) {
            super(start, Infinity, step);
        }
        else {
            super(start, -Infinity, step);
        }
    }
}
export const rangeFrom = RangeFrom.from;
