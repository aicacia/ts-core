import { IIterator } from "./IIterator";

export class Iterator<T> implements IIterator<T>, IEquals<Iterator<T>> {
  private _iter: IIterator<T>;

  constructor(iter: IIterator<T>) {
    this._iter = iter;
  }

  [Symbol.iterator](): NativeIterator<T> {
    return new NativeIterator(this);
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

  indexOf(value: T): Option<number> {
    let next = this.next(),
      index = 0;

    while (next.isSome()) {
      if (next.unwrap() === value) {
        return some(index);
      }
      index += 1;
    }

    return none();
  }

  findIndex(fn: (value: T) => boolean): Option<number> {
    let next = this.next(),
      index = 0;

    while (next.isSome()) {
      if (fn(next.unwrap())) {
        return some(index);
      }
      index += 1;
    }

    return none();
  }

  find(fn: (value: T) => boolean): Option<T> {
    let next = this.next();

    while (next.isSome()) {
      const value = next.unwrap();

      if (fn(value)) {
        return some(value);
      }
    }

    return none();
  }

  nth(index: number = 0): Option<T> {
    let next = this.next();

    if (index < 0) {
      index = 0;
    }

    while (next.isSome()) {
      if (index-- <= 0) {
        return next;
      }
      next = this.next();
    }

    return none();
  }

  first(): Option<T> {
    return this.nth();
  }

  any(fn: (value: T) => boolean): boolean {
    return this.findIndex(fn).isSome();
  }
  some(fn: (value: T) => boolean): boolean {
    return this.any(fn);
  }
  none(fn: (value: T) => boolean): boolean {
    return this.findIndex(fn).isNone();
  }

  all(fn: (value: T) => boolean): boolean {
    let next = this.next();

    while (next.isSome()) {
      if (!fn(next.unwrap())) {
        return false;
      }
    }

    return true;
  }

  reduce<C>(acc: C, fn: (acc: C, value: T) => C): C {
    let next = this.next();

    while (next.isSome()) {
      acc = fn(acc, next.unwrap());
      next = this.next();
    }

    return acc;
  }

  reverse(): Iterator<T> {
    const reverse = this.toArray();
    reverse.reverse();
    return iter(reverse);
  }

  equals(other: Iterator<T>): boolean {
    let aNext = this.next(),
      bNext = other.next();

    while (aNext.isSome() && bNext.isSome()) {
      if (!aNext.equals(bNext)) {
        return false;
      }
      aNext = this.next();
      bNext = other.next();
    }

    return true;
  }
}

import { ForEach } from "./ForEach";
import { Map } from "./Map";
import { Filter } from "./Filter";
import { Step } from "./Step";
import { Skip } from "./Skip";
import { ToMap, defaultKeyFn, defaultValueFn } from "./ToMap";
import { Option, none, some } from "../option";
import { iter } from "./iter";
import { NativeIterator } from "./NativeIterator";
import { IEquals } from "../equals";
