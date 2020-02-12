import { Option } from "../option";
import { IIterator } from "./IIterator";
import { Iterator } from "./Iterator";

export type UnflattenFn<T, U> = (iter: IIterator<T>) => Option<U>;

export class Unflatten<T, U> extends Iterator<U> {
  private _fn: UnflattenFn<T, U>;

  constructor(iter: IIterator<T>, fn: UnflattenFn<T, U>) {
    super(iter as any);
    this._fn = fn;
  }

  next(): Option<U> {
    return this._fn(this._iter as any);
  }
}
