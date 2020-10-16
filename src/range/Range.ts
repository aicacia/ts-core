import { IIterator, Iterator } from "../iter";
import { none, Option, some } from "../option";

export enum RangeDirection {
  Forward,
  Backward,
}

export class Range implements IIterator<number> {
  static from(start: number, end: number) {
    return new Range(start, end);
  }

  start: number;
  end: number;
  private direction: RangeDirection;

  constructor(start: number, end: number) {
    this.start = start;
    this.end = end;
    this.direction =
      start > end ? RangeDirection.Backward : RangeDirection.Forward;
  }

  contains(item: number) {
    return this.start <= item && item <= this.end;
  }

  isEmpty() {
    if (this.direction === RangeDirection.Forward) {
      return this.start > this.end;
    } else {
      return this.start < this.end;
    }
  }

  iter() {
    return new Iterator(this);
  }

  next(): Option<number> {
    if (this.isEmpty()) {
      return none();
    } else {
      if (this.direction === RangeDirection.Forward) {
        return some(this.start++);
      } else {
        return some(this.start--);
      }
    }
  }
}

export const range = Range.from;