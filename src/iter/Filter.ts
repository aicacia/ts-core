import { none, Option, some } from "../option";
import { IIterator } from "./IIterator";
import { Iterator } from "./Iterator";

export type IFilterPredicateFn<T, S extends T> = (
  value: T,
  index: number
) => value is S;
export type IFilterBooleanFn<T> = (value: T, index: number) => boolean;

export class Filter<T, S extends T> extends Iterator<S> {
  private _fn: IFilterBooleanFn<T> | IFilterPredicateFn<T, S>;

  constructor(
    iter: IIterator<T>,
    fn: IFilterBooleanFn<T> | IFilterPredicateFn<T, S>
  ) {
    super(iter as IIterator<S>);
    this._fn = fn;
  }

  next(): Option<S> {
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
