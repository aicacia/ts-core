import { Option } from "../option";
import { IIterator } from "./IIterator";
import { Iterator } from "./Iterator";

export type IForEachFn<T> = (value: T, index: number) => void;

export class ForEach<T> extends Iterator<T> {
  private _fn: (tuple: [value: T, index: number]) => T;

  constructor(iter: IIterator<T>, fn: IForEachFn<T>) {
    super(iter);
    this._fn = ([value, index]) => {
      fn(value, index);
      return value;
    };
  }

  next(): Option<T> {
    return super.nextWithIndex().map(this._fn);
  }
}
