import { IIterator, Iterator } from "../iter";
import { none, Option, some } from "../option";

export class Range implements IIterator<number> {
  static from(start: number, end: number) {
    return new Range(start, end);
  }

  start: number;
  end: number;
  private dir: -1 | 1;

  constructor(start: number, end: number) {
    this.start = start;
    this.end = end;
    this.dir = start > end ? -1 : 1;
  }

  contains(item: number) {
    return this.start <= item && item <= this.end;
  }

  isEmpty() {
    if (this.dir === 1) {
      return this.start > this.end;
    } else {
      return this.end > this.start;
    }
  }

  iter() {
    return new Iterator(this);
  }

  next(): Option<number> {
    if (this.isEmpty()) {
      return none();
    } else {
      if (this.dir === 1) {
        return some(this.start++);
      } else {
        return some(this.start--);
      }
    }
  }
}

export const range = Range.from;
