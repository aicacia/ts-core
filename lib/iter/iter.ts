import { isFunction, isNumber, isObject } from "util";
import { none, Option, some } from "../option";
import { IIterator } from "./IIterator";
import { Iterator } from "./Iterator";

export function iter<T>(value: T[] | IIterator<T>): Iterator<T>;
export function iter<O>(value: O): Iterator<[keyof O, O[keyof O]]>;

export function iter(value: any): Iterator<any> {
  if (isObject(value)) {
    if (isNumber(value.length)) {
      return new Iterator(new ArrayIterator(value));
    } else if (isFunction(value.next)) {
      return new Iterator(value);
    } else {
      return new Iterator(new ObjectIterator(value));
    }
  } else {
    return new Iterator(new ArrayIterator([value] as any));
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

class ObjectIterator<O extends {}> extends ArrayIterator<[keyof O, O[keyof O]]> {
  constructor(object: O) {
    super(Object.entries(object) as any);
  }
}