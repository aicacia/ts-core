import { IIterator } from "./IIterator";

export class NativeIterator<T> implements Iterator<T> {
  private _iter: IIterator<T>;

  constructor(iter: IIterator<T>) {
    this._iter = iter;
  }

  next() {
    let next = this._iter.next();

    if (next.isSome()) {
      return {
        done: false,
        value: next.unwrap()
      };
    } else {
      return {
        done: true,
        value: (undefined as any) as T
      };
    }
  }
}
