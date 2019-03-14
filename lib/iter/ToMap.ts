import { none, Option, some } from "../option";
import { IIterator } from "./IIterator";
import { Iterator } from "./Iterator";

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
    return this.reduce<{ [key: string]: V }>({}, (object, value) => {
      object[value[0] as any] = value[1];
      return object;
    });
  }

  next(): Option<[K, V]> {
    return super
      .next()
      .map(
        value =>
          [this._keyFn(value as any), this._valueFn(value as any)] as [K, V]
      );
  }
}
