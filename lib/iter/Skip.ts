import { IIterator } from "./IIterator";
import { Iterator } from "./Iterator";
import { none, Option } from "../option";

export class Skip<T> extends Iterator<T> {
  private _skipped: number;
  private _skip: number;

  constructor(iter: IIterator<T>, skip: number) {
    super(iter);
    this._skipped = 0;
    this._skip = skip <= 0 ? 1 : skip | 0;
  }

  next(): Option<T> {
    let result = super.next();

    while (result.isSome()) {
      if (this._skipped <= this._skip) {
        this._skipped += 1;
        result = super.next();
      } else {
        return result;
      }
    }

    return none();
  }
}
