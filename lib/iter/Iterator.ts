import { IIterator } from "./IIterator";

export class Iterator<T> implements IIterator<T> {
  private _iter: IIterator<T>;

  constructor(iter: IIterator<T>) {
    this._iter = iter;
  }

  iter(): Iterator<T> {
    return this;
  }

  next(): Option<T> {
    return this._iter.next();
  }

  forEach(fn: (value: T) => void): ForEach<T> {
    return new ForEach(this, fn);
  }

  map<B>(fn: (value: T) => B): Map<T, B> {
    return new Map(this, fn);
  }

  filter(fn: (value: T) => boolean): Filter<T> {
    return new Filter(this, fn);
  }

  step(step: number): Step<T> {
    return new Step(this, step);
  }

  skip(skip: number): Skip<T> {
    return new Skip(this, skip);
  }

  toMap<K, V>(
    keyFn: (value: T) => K = defaultKeyFn,
    valueFn: (value: T) => V = defaultValueFn
  ): ToMap<T, K, V> {
    return new ToMap(this, keyFn, valueFn);
  }

  count(): number {
    return this.reduce<number>(0, count => {
      return count + 1;
    });
  }

  toArray(): Array<T> {
    return this.reduce<Array<T>>([], (array, value) => {
      array.push(value);
      return array;
    });
  }

  indexOf(value: T): number {
    let result = this.next(),
      index = 0;

    while (result.isSome()) {
      if (result.unwrap() === value) {
        return index;
      }
      index += 1;
    }

    return -1;
  }

  findIndex(fn: (value: T) => boolean): number {
    let result = this.next(),
      index = 0;

    while (result.isSome()) {
      if (fn(result.unwrap())) {
        return index;
      }
      index += 1;
    }

    return -1;
  }

  find(fn: (value: T) => boolean): T | undefined {
    let result = this.next();

    while (result.isSome()) {
      const value = result.unwrap();

      if (fn(value)) {
        return value;
      }
    }

    return undefined;
  }

  any(fn: (value: T) => boolean): boolean {
    return this.findIndex(fn) !== -1;
  }
  some(fn: (value: T) => boolean): boolean {
    return this.any(fn);
  }
  none(fn: (value: T) => boolean): boolean {
    return this.findIndex(fn) === -1;
  }

  all(fn: (value: T) => boolean): boolean {
    let result = this.next();

    while (result.isSome()) {
      if (!fn(result.unwrap())) {
        return false;
      }
    }

    return true;
  }

  reduce<C>(acc: C, fn: (acc: C, value: T) => C): C {
    let result = this.next();

    while (result.isSome()) {
      acc = fn(acc, result.unwrap());
      result = this.next();
    }

    return acc;
  }

  reverse(): Iterator<T> {
    const reverse = this.toArray();
    reverse.reverse();
    return iter(reverse);
  }
}

import { ForEach } from "./ForEach";
import { Map } from "./Map";
import { Filter } from "./Filter";
import { Step } from "./Step";
import { Skip } from "./Skip";
import { ToMap, defaultKeyFn, defaultValueFn } from "./ToMap";
import { Option } from "../option";
import { iter } from "./iter";
