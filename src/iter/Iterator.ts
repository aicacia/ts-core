import { IIterator } from "./IIterator";

export class Iterator<T> implements IIterator<T>, IEquals<Iterator<T>> {
  protected _iter: IIterator<T>;
  protected _index = 0;

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
    const next = this._iter.next();

    if (next.isSome()) {
      this._index += 1;
    }

    return next;
  }

  nextWithIndex(): Option<[T, number]> {
    return this._iter.next().map((value) => [value, this._index++]);
  }

  forEach(fn: IForEachFn<T>): ForEach<T> {
    return new ForEach(this, fn);
  }

  map<B>(fn: IMapFn<T, B>): Map<T, B> {
    return new Map(this, fn);
  }

  merge(iter: IIterator<T>): Merge<T> {
    return new Merge(this, iter);
  }

  concat(iter: IIterator<T>): Merge<T> {
    return this.merge(iter);
  }

  filter<S extends T>(fn: IFilterPredicateFn<T, S>): Filter<T, S>;
  filter(fn: IFilterBooleanFn<T>): Filter<T, T>;
  filter(fn: any): any {
    return new Filter(this, fn);
  }

  step(step: number): Step<T> {
    return new Step(this, step);
  }

  skip(skip: number): Skip<T> {
    return new Skip(this, skip);
  }

  take(count: number): Take<T> {
    return new Take(this, count);
  }

  toMap<K extends string | number | symbol, V>(
    keyFn: IToMapFn<T, K> = defaultKeyFn,
    valueFn: IToMapFn<T, V> = defaultValueFn
  ): ToMap<T, K, V> {
    return new ToMap(this, keyFn, valueFn);
  }

  count(): number {
    return this.reduce<number>(0, (count) => {
      return count + 1;
    });
  }

  consume() {
    let next = this.next();

    while (next.isSome()) {
      next = this.next();
    }
  }

  toArray(): T[] {
    return this.reduce<T[]>([], (array, value) => {
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
      index++;
      next = this.next();
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
      index++;
      next = this.next();
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
      next = this.next();
    }

    return none();
  }

  findAll(fn: (value: T) => boolean) {
    return this.filter(fn);
  }

  nth(index = 0): Option<T> {
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
    return this.nth(0);
  }

  last(): Option<T> {
    let current = this.next();

    while (current.isSome()) {
      const next = this.next();

      if (next.isNone()) {
        return current;
      } else {
        current = next;
      }
    }

    return none();
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
      next = this.next();
    }

    return true;
  }

  unflatten<U>(fn: UnflattenFn<T, U>) {
    return new Unflatten(this, fn);
  }

  reduce<C>(acc: C, fn: (acc: C, value: T) => C): C {
    let next = this.next();

    while (next.isSome()) {
      acc = fn(acc, next.unwrap());
      next = this.next();
    }

    return acc;
  }

  reverse() {
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
      } else {
        aNext = this.next();
        bNext = other.next();
      }
    }

    return true;
  }
}

import { IEquals } from "../equals/equals";
import { none, Option, some } from "../option";
import { Filter, IFilterBooleanFn, IFilterPredicateFn } from "./Filter";
import { ForEach, IForEachFn } from "./ForEach";
import { iter } from "./iter";
import { IMapFn, Map } from "./Map";
import { Merge } from "./Merge";
import { NativeIterator } from "./NativeIterator";
import { Skip } from "./Skip";
import { Step } from "./Step";
import { Take } from "./Take";
import { defaultKeyFn, defaultValueFn, IToMapFn, ToMap } from "./ToMap";
import { Unflatten, UnflattenFn } from "./Unflatten";
