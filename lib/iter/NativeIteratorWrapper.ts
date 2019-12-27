import { none, Option, some } from "../option";
import { IIterator } from "./IIterator";

export class NativeIteratorWrapper<T> implements IIterator<T> {
  private _iter: Iterator<T, T>;

  constructor(iter: Iterator<T, T>) {
    this._iter = iter;
  }

  next(): Option<T> {
    const result = this._iter.next();

    if (result.done) {
      return none();
    } else {
      return some(result.value);
    }
  }
}
