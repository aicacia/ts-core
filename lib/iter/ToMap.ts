import { IIterator } from "./IIterator";
import { Iterator } from "./Iterator";
import { Option, some, none } from "../option";

export const defaultKeyFn = <A, B>(key: A): B => key as any;
export const defaultValueFn = <A, B>(value: A): B => value as any;

export class ToMap<T, K, V> extends Iterator<[K, V]> {
  private _keyFn: (value: T) => K;
  private _valueFn: (value: T) => V;

  constructor(
    iter: IIterator<T>,
    keyFn: (value: T) => K,
    valueFn: (value: T) => V
  ) {
    super((iter as any) as IIterator<[K, V]>);
    this._keyFn = keyFn;
    this._valueFn = valueFn;
  }

  toObject(): { [key: string]: V } {
    return this.reduce({} as { [key: string]: V }, (object, value) => {
      object[value[0] as any] = value[1];
      return object;
    });
  }

  next(): Option<[K, V]> {
    const result = super.next();

    if (result.isSome()) {
      const value = (result.unwrap() as any) as T;

      return some<[K, V]>([this._keyFn(value), this._valueFn(value)]);
    }

    return none();
  }
}
