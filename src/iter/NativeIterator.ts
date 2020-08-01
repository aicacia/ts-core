import { IIterator } from "./IIterator";

export class NativeIterator<T> implements Iterator<T> {
  private _iter: IIterator<T>;

  constructor(iter: IIterator<T>) {
    this._iter = iter;
  }

  next() {
    return this._iter
      .next()
      .mapOrElse<IteratorResult<T>>(mapNext, mapNone)
      .unwrap();
  }
}

const mapNext = <T>(value: T): IteratorYieldResult<T> => ({
  done: false,
  value,
});
const mapNone = <T>(): IteratorReturnResult<T> => ({
  done: true,
  value: (undefined as any) as T,
});
