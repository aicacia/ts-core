import { Option } from "../option";
import { IIterator } from "./IIterator";
import { Iterator } from "./Iterator";

export type IForEachFn<T> = (value: T, index: number) => void;

export class ForEach<T> extends Iterator<T> {
  private _fn: IForEachFn<T>;

  constructor(iter: IIterator<T>, fn: IForEachFn<T>) {
    super(iter);
    this._fn = fn;
  }

  next(): Option<T> {
    return super.nextWithIndex().map(([value, index]) => {
      this._fn(value, index);
      return value;
    });
  }
}
