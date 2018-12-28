import { IIterator } from "./IIterator";
import { Iterator } from "./Iterator";
import { Option, none } from "../option";

export class Step<T> extends Iterator<T> {
  private _stepped: number;
  private _step: number;

  constructor(iter: IIterator<T>, step: number) {
    super(iter);
    this._stepped = 0;
    this._step = step <= 0 ? 1 : step | 0;
  }

  next(): Option<T> {
    let result = super.next();

    while (result.isSome()) {
      if (this._stepped < this._step) {
        this._stepped += 1;
        result = super.next();
      } else {
        this._stepped = 0;
        return result;
      }
    }

    return none();
  }
}
