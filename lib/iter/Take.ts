import { none, Option } from "../option";
import { IIterator } from "./IIterator";
import { Iterator } from "./Iterator";

export class Take<T> extends Iterator<T> {
  private _taken: number;
  private _count: number;

  constructor(iter: IIterator<T>, count: number) {
    super(iter);
    this._taken = 0;
    this._count = (count <= 0 ? 0 : count) | 0;
  }

  next(): Option<T> {
    if (this._taken < this._count) {
      this._taken += 1;
      return super.next();
    } else {
      return none();
    }
  }
}
