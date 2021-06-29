export class Iter<T>
  implements
    Iterable<T>,
    Iterator<T, undefined, undefined>,
    IterableIterator<T>
{
  protected _iter: Iterator<T>;
  protected _index = 0;

  constructor(iter: Iterator<T>) {
    this._iter = iter;
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this;
  }

  iter(): Iter<T> {
    return this;
  }

  next(): IteratorResult<T, undefined> {
    return this._iter.next();
  }

  nextWithIndex(): IteratorResult<[T, number], undefined> {
    const next = this._iter.next();

    if (next.done) {
      return next;
    } else {
      return { value: [next.value, this._index++] };
    }
  }

  enumerate(): Enumerate<T> {
    return new Enumerate(this);
  }

  peekable(): Peekable<T> {
    return new Peekable(this);
  }

  forEach(fn: IForEachFn<T>): ForEach<T> {
    return new ForEach(this, fn);
  }

  map<B>(fn: IMapFn<T, B>): Map<T, B> {
    return new Map(this, fn);
  }

  merge(iter: Iterator<T>): Merge<T> {
    return new Merge(this, iter);
  }

  concat(iter: Iterator<T>): Merge<T> {
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

  count() {
    return this.reduce(0, (count) => count + 1);
  }

  consume() {
    let next = this.next();

    while (!next.done) {
      next = this.next();
    }

    return this;
  }

  toArray(): T[] {
    return this.reduce<T[]>([], (array, value) => {
      array.push(value);
      return array;
    });
  }

  join(separator?: string): string {
    return this.toArray().join(separator);
  }

  indexOf(value: T): number {
    let next = this.next(),
      index = 0;

    while (!next.done) {
      if (next.value === value) {
        return index;
      }
      index++;
      next = this.next();
    }

    return -1;
  }

  findIndex(fn: (value: T, index: number) => boolean): number {
    let next = this.nextWithIndex();

    while (!next.done) {
      const [value, index] = next.value;

      if (fn(value, index)) {
        return index;
      }
      next = this.nextWithIndex();
    }

    return -1;
  }

  find(fn: (value: T, index: number) => boolean): Option<T> {
    let next = this.nextWithIndex();

    while (!next.done) {
      const [value, index] = next.value;

      if (fn(value, index)) {
        return some(value);
      }
      next = this.nextWithIndex();
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

    while (!next.done) {
      if (index-- <= 0) {
        return some(next.value);
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

    while (!current.done) {
      const next = this.next();

      if (next.done) {
        return some(current.value);
      } else {
        current = next;
      }
    }

    return none();
  }

  any(fn: (value: T, index: number) => boolean): boolean {
    return this.findIndex(fn) !== -1;
  }
  some(fn: (value: T, index: number) => boolean): boolean {
    return this.any(fn);
  }
  none(fn: (value: T, index: number) => boolean): boolean {
    return this.findIndex(fn) === -1;
  }

  all(fn: (value: T, index: number) => boolean): boolean {
    let next = this.nextWithIndex();

    while (!next.done) {
      const [value, index] = next.value;

      if (!fn(value, index)) {
        return false;
      }
      next = this.nextWithIndex();
    }

    return true;
  }

  unflatten<U>(fn: UnflattenFn<T, U>) {
    return new Unflatten(this, fn);
  }

  reduce<C>(acc: C, fn: (acc: C, value: T, index: number) => C): C {
    let next = this.next();

    while (!next.done) {
      const value = next.value;
      acc = fn(acc, value, this._index - 1);
      next = this.next();
    }

    return acc;
  }

  reverse() {
    return iter(this.toArray().reverse());
  }
}

export function iter<T>(
  value: T[] | Iterator<T> | Iter<T> | Iterable<T>
): Iter<T>;
export function iter<O>(
  value: O | Iterable<[keyof O, O[keyof O]]>
): Iter<[keyof O, O[keyof O]]>;

export function iter(value: any): Iter<any> {
  if (value != null) {
    if (typeof value[Symbol.iterator] === "function") {
      return new Iter(value[Symbol.iterator]());
    } else if (typeof value.next === "function") {
      if (value instanceof Iter) {
        return value;
      } else {
        return new Iter(value);
      }
    } else if (typeof value === "object") {
      return iter(Object.entries(value));
    } else {
      return iter([value]);
    }
  } else {
    return iter([] as any[]);
  }
}

import { none, Option, some } from "../option";
import { Filter, IFilterBooleanFn, IFilterPredicateFn } from "./Filter";
import { ForEach, IForEachFn } from "./ForEach";
import { IMapFn, Map } from "./Map";
import { Merge } from "./Merge";
import { Skip } from "./Skip";
import { Step } from "./Step";
import { Take } from "./Take";
import { defaultKeyFn, defaultValueFn, IToMapFn, ToMap } from "./ToMap";
import { Unflatten, UnflattenFn } from "./Unflatten";
import { Enumerate } from "./Enumerate";
import { Peekable } from "./Peekable";
