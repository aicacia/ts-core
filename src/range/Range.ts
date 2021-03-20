import { Iter } from "../iter";

export enum RangeDirection {
  Forward,
  Backward,
}

export class Range implements Iterator<number>, Iterable<number> {
  static from(start: number, end: number) {
    return new Range(start, end);
  }

  private start: number;
  private end: number;
  private direction: RangeDirection;

  constructor(start: number, end: number) {
    this.start = start;
    this.end = end;
    this.direction =
      start > end ? RangeDirection.Backward : RangeDirection.Forward;
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

  iter(): Iter<number> {
    return new Iter(this);
  }

  [Symbol.iterator]() {
    return this;
  }

  next(): IteratorResult<number> {
    if (this.isEmpty()) {
      return { done: true, value: undefined };
    } else {
      if (this.direction === RangeDirection.Forward) {
        return { done: false, value: this.start++ };
      } else {
        return { done: false, value: this.start-- };
      }
    }
  }
}

export const range = Range.from;
