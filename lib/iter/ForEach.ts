import { Option } from "../option";
import { IIterator } from "./IIterator";
import { Iterator } from "./Iterator";

export class ForEach<T> extends Iterator<T> {
  private _fn: (value: T) => void;

  constructor(iter: IIterator<T>, fn: (value: T) => void) {
    super(iter);
    this._fn = fn;
  }

  next(): Option<T> {
    return super.next().map(value => {
      this._fn(value);
      return value;
    });
  }
}
