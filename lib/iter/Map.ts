import { Option } from "../option";
import { IIterator } from "./IIterator";
import { Iterator } from "./Iterator";

export class Map<A, B> extends Iterator<B> {
  private _fn: (value: A) => B;

  constructor(iter: IIterator<A>, fn: (value: A) => B) {
    super((iter as any) as IIterator<B>);
    this._fn = fn;
  }

  next(): Option<B> {
    return ((super.next() as any) as Option<A>).map(this._fn);
  }
}
