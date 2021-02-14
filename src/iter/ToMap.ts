import { Option } from "../option";
import { IIterator } from "./IIterator";
import { Iterator } from "./Iterator";

export type IToMapFn<A, B> = (value: A, index: number) => B;

export const defaultKeyFn = <A, B>(key: A): B => key as any;
export const defaultValueFn = <A, B>(value: A): B => value as any;

export class ToMap<T, K extends string | number | symbol, V> extends Iterator<
  [K, V]
> {
  private _map: (tuple: [value: any, index: number]) => [K, V];

  constructor(
    iter: IIterator<T>,
    keyFn: IToMapFn<T, K>,
    valueFn: IToMapFn<T, V>
  ) {
    super((iter as any) as IIterator<[K, V]>);
    this._map = ([value, index]) =>
      [keyFn(value, index), valueFn(value, index)] as [K, V];
  }

  toObject(): Record<K, V> {
    return this.reduce<Record<K, V>>({} as Record<K, V>, (object, value) => {
      object[value[0]] = value[1];
      return object;
    });
  }

  next(): Option<[K, V]> {
    return super.nextWithIndex().map(this._map);
  }
}
