import { Option } from "../option";
import { IIterator } from "./IIterator";
import { Iterator } from "./Iterator";

export type IToMapFn<A, B> = (value: A, index: number) => B;

export const defaultKeyFn = <A, B>(key: A): B => key as any;
export const defaultValueFn = <A, B>(value: A): B => value as any;

export class ToMap<T, K extends string | number | symbol, V> extends Iterator<
  [K, V]
> {
  private _keyFn: IToMapFn<T, K>;
  private _valueFn: IToMapFn<T, V>;

  constructor(
    iter: IIterator<T>,
    keyFn: IToMapFn<T, K>,
    valueFn: IToMapFn<T, V>
  ) {
    super((iter as any) as IIterator<[K, V]>);
    this._keyFn = keyFn;
    this._valueFn = valueFn;
  }

  toObject(): Record<K, V> {
    return this.reduce<Record<K, V>>({} as Record<K, V>, (object, value) => {
      object[value[0]] = value[1];
      return object;
    });
  }

  next(): Option<[K, V]> {
    return super
      .nextWithIndex()
      .map(
        ([value, index]) =>
          [
            this._keyFn(value as any, index),
            this._valueFn(value as any, index),
          ] as [K, V]
      );
  }
}
