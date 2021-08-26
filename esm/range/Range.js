import { Iter } from "../iter";
export var RangeDirection;
(function (RangeDirection) {
    RangeDirection[RangeDirection["Forward"] = 0] = "Forward";
    RangeDirection[RangeDirection["Backward"] = 1] = "Backward";
})(RangeDirection || (RangeDirection = {}));
export class Range {
    constructor(start, end, step = 1) {
        this.start = start;
        this.end = end;
        this.step = Math.abs(step);
        this.direction =
            start > end ? RangeDirection.Backward : RangeDirection.Forward;
    }
    static from(start, end, step = 1) {
        return new Range(start, end, step);
    }
    getStart() {
        return this.start;
    }
    getEnd() {
        return this.end;
    }
    getStep() {
        return this.step;
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
            const value = this.start;
            if (this.direction === RangeDirection.Forward) {
                this.start += this.step;
            }
            else {
                this.start -= this.step;
            }
            return { done: false, value };
        }
    }
}
export const range = Range.from;
