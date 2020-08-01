import { isFunction, isNumber, isObject } from "util";
import { none, Option, some } from "../option";
import { IIterator } from "./IIterator";
import { Iterator as CoreIterator } from "./Iterator";
import { NativeIteratorWrapper } from "./NativeIteratorWrapper";

export function iter<T>(
  value: T[] | IIterator<T> | Iterator<T> | Iterable<T> | IterableIterator<T>
): CoreIterator<T>;
export function iter<O>(
  value: O | IterableIterator<[keyof O, O[keyof O]]>
): CoreIterator<[keyof O, O[keyof O]]>;

export function iter(value: any): CoreIterator<any> {
  if (isObject(value)) {
    if (isNumber(value.length)) {
      return new CoreIterator(new ArrayIterator(value));
    } else if (isFunction(value.next)) {
      if (value instanceof CoreIterator) {
        return value;
      } else {
        return new CoreIterator(new NativeIteratorWrapper(value));
      }
    } else if (isFunction(value[Symbol.iterator])) {
      return new CoreIterator(
        new NativeIteratorWrapper(value[Symbol.iterator]())
      );
    } else {
      return new CoreIterator(new ObjectIterator(value));
    }
  } else {
    return new CoreIterator(new ArrayIterator([value] as any));
  }
}

class ArrayIterator<T> implements IIterator<T> {
  private _array: T[];
  private _index: number;
  private _length: number;

  constructor(array: T[]) {
    this._array = array;
    this._index = 0;
    this._length = array.length;
  }

  next(): Option<T> {
    if (this._index < this._length) {
      return some(this._array[this._index++]);
    } else {
      return none();
    }
  }
}

class ObjectIterator<O extends Record<string, any>> extends ArrayIterator<
  [keyof O, O[keyof O]]
> {
  constructor(object: O) {
    super(Object.entries(object) as any);
  }
}
