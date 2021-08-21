import { Iter } from "../iter";

export enum RangeDirection {
  Forward,
  Backward,
}

export class Range implements Iterator<number>, Iterable<number> {
  static from(start: number, end: number, step = 1) {
    return new Range(start, end, step);
  }

  private start: number;
  private end: number;
  private step: number;
  private direction: RangeDirection;

  constructor(start: number, end: number, step = 1) {
    this.start = start;
    this.end = end;
    this.step = Math.abs(step);
    this.direction =
      start > end ? RangeDirection.Backward : RangeDirection.Forward;
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
      const value = this.start;
      if (this.direction === RangeDirection.Forward) {
        this.start += this.step;
      } else {
        this.start -= this.step;
      }
      return { done: false, value };
    }
  }
}

export const range = Range.from;
