import { none, Option, some } from "../option";
import { IIterator } from "./IIterator";
import { Iterator } from "./Iterator";

export type IFilterFn<T> = (value: T, index: number) => boolean;

export class Filter<T> extends Iterator<T> {
  private _fn: IFilterFn<T>;

  constructor(iter: IIterator<T>, fn: IFilterFn<T>) {
    super(iter);
    this._fn = fn;
  }

  next(): Option<T> {
    let result = super.nextWithIndex();

    while (result.isSome()) {
      const [value, index] = result.unwrap();

      if (this._fn(value, index)) {
        return some(value);
      }
      result = super.nextWithIndex();
    }

    return none();
  }
}
