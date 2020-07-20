import { Option } from "../option";
import { IIterator } from "./IIterator";
import { Iterator } from "./Iterator";

export class Merge<T> extends Iterator<T> {
  private _other: IIterator<T>;

  constructor(iter: IIterator<T>, other: IIterator<T>) {
    super(iter);
    this._other = other;
  }

  next(): Option<T> {
    return super.next().orElse(this.onOtherNext);
  }

  private onOtherNext = () => this._other.next();
}
