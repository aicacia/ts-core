import { Iter } from "../iter";
export var RangeDirection;
(function (RangeDirection) {
    RangeDirection[RangeDirection["Forward"] = 0] = "Forward";
    RangeDirection[RangeDirection["Backward"] = 1] = "Backward";
})(RangeDirection || (RangeDirection = {}));
export class Range {
    constructor(start, end) {
        this.start = start;
        this.end = end;
        this.direction =
            start > end ? RangeDirection.Backward : RangeDirection.Forward;
    }
    static from(start, end) {
        return new Range(start, end);
    }
    getStart() {
        return this.start;
    }
    getEnd() {
        return this.end;
    }
    getDirection() {
        return this.direction;
    }
    contains(item) {
        return this.start <= item && item <= this.end;
    }
    isEmpty() {
        if (this.direction === RangeDirection.Forward) {
            return this.start > this.end;
        }
        else {
            return this.start < this.end;
        }
    }
    iter() {
        return new Iter(this);
    }
    [Symbol.iterator]() {
        return this;
    }
    next() {
        if (this.isEmpty()) {
            return { done: true, value: undefined };
        }
        else {
            if (this.direction === RangeDirection.Forward) {
                return { done: false, value: this.start++ };
            }
            else {
                return { done: false, value: this.start-- };
            }
        }
    }
}
export const range = Range.from;
