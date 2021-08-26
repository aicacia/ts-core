import type { Option } from "../option";
import type { Filter, IFilterBooleanFn, IFilterPredicateFn } from "./Filter";
import type { ForEach, IForEachFn } from "./ForEach";
import type { IMapFn, Map } from "./Map";
import type { Merge } from "./Merge";
import type { Skip } from "./Skip";
import type { Step } from "./Step";
import type { Take } from "./Take";
import type { IToMapFn, ToMap } from "./ToMap";
import type { Unflatten, UnflattenFn } from "./Unflatten";
import type { Enumerate } from "./Enumerate";
import type { Peekable } from "./Peekable";
export declare class Iter<T> implements Iterable<T>, Iterator<T, undefined, undefined>, IterableIterator<T> {
    protected _iter: Iterator<T>;
    protected _index: number;
    constructor(iter: Iterator<T>);
    [Symbol.iterator](): IterableIterator<T>;
    iter(): Iter<T>;
    next(): IteratorResult<T, undefined>;
    nextWithIndex(): IteratorResult<[T, number], undefined>;
    enumerate(): Enumerate<T>;
    peekable(): Peekable<T>;
    forEach(fn: IForEachFn<T>): ForEach<T>;
    map<B>(fn: IMapFn<T, B>): Map<T, B>;
    merge(iter: Iterator<T>): Merge<T>;
    concat(iter: Iterator<T>): Merge<T>;
    filter<S extends T>(fn: IFilterPredicateFn<T, S>): Filter<T, S>;
    filter(fn: IFilterBooleanFn<T>): Filter<T, T>;
    step(step: number): Step<T>;
    skip(skip: number): Skip<T>;
    take(count: number): Take<T>;
    toMap<K extends string | number | symbol, V>(keyFn?: IToMapFn<T, K>, valueFn?: IToMapFn<T, V>): ToMap<T, K, V>;
    count(): number;
    consume(): this;
    toArray(): T[];
    join(separator?: string): string;
    indexOf(value: T): number;
    findIndex(fn: (value: T, index: number) => boolean): number;
    find(fn: (value: T, index: number) => boolean): Option<T>;
    findAll(fn: (value: T) => boolean): Filter<T, T>;
    nth(index?: number): Option<T>;
    first(): Option<T>;
    last(): Option<T>;
    any(fn: (value: T, index: number) => boolean): boolean;
    some(fn: (value: T, index: number) => boolean): boolean;
    none(fn: (value: T, index: number) => boolean): boolean;
    all(fn: (value: T, index: number) => boolean): boolean;
    unflatten<U>(fn: UnflattenFn<T, U>): Unflatten<T, U>;
    reduce<C>(acc: C, fn: (acc: C, value: T, index: number) => C): C;
    reverse(): Iter<T>;
}
export declare function iter<T>(value: T[] | Iterator<T> | Iter<T> | Iterable<T>): Iter<T>;
export declare function iter<O>(value: O | Iterable<[keyof O, O[keyof O]]>): Iter<[keyof O, O[keyof O]]>;
