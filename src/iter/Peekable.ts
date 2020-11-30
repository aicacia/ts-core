import { Option, some } from "../option";
import { Iterator } from "./Iterator";

export class Peekable<T> extends Iterator<T> {
  private peeked: T[] = [];

  peek(offset = 0): Option<T> {
    if (offset < this.peeked.length) {
      return some(this.peeked[offset]);
    } else {
      let index = this.peeked.length - offset - 1,
        next = super.next();

      while (next.isSome()) {
        this.peeked.push(next.unwrap());

        if (--index <= 0) {
          break;
        } else {
          next = super.next();
        }
      }

      return next;
    }
  }

  next(): Option<T> {
    if (this.peeked.length > 0) {
      return some(this.peeked.shift() as T);
    } else {
      return super.next();
    }
  }
}
