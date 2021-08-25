declare function integerToBytes<B extends Uint8Array | [number, number, number, number] = Uint8Array | [number, number, number, number]>(bytes: B, integer: number): B;

declare abstract class Hasher {
    abstract finish(): number;
    abstract write<B extends Uint8Array | number[] = Uint8Array | number[]>(bytes: B): this;
    writeByte(byte: number): this;
    writeInteger(integer: number): this;
}

declare function defaultHasher(): Hasher;

declare function bytesToInteger<B extends Uint8Array | [number, number, number, number] = Uint8Array | [number, number, number, number]>(bytes: B): number;

declare class FastHasher extends Hasher {
    private hash;
    finish(): number;
    write(bytes: Uint8Array | number[]): this;
}

declare function hashOf(value: any, getHasher?: () => Hasher): number;
declare function hash<H extends Hasher = Hasher>(value: any, hasher: H): H;

declare class Result<T, E = Error> {
    static ok<T, E = Error>(value: T): Result<T, E>;
    static err<T, E = Error>(error: E): Result<T, E>;
    static fromOption<T>(option: Option<T>, msg?: string): Result<T, Error>;
    private _ok;
    private _err;
    constructor(createSecret: unknown, ok: T, err: E);
    isErr(): boolean;
    isOk(): boolean;
    expect(): T;
    unwrap(): T;
    unwrapOr(def: T): T;
    unwrapOrElse(defFn: (error: E) => T): T;
    map<U>(fn: (ok: T) => U): Result<U, E>;
    mapOr<U>(fn: (ok: T) => U, def: U): Result<U, E>;
    mapOrElse<U>(fn: (ok: T) => U, defFn: (error: E) => U): Result<U, E>;
    flatMap<U>(fn: (ok: T) => Result<U, E>): Result<U, E>;
    flatMapOr<U>(fn: (ok: T) => Result<U, E>, def: Result<U, E>): Result<U, E>;
    flatMapOrElse<U>(fn: (ok: T) => Result<U, E>, defFn: (error: E) => Result<U, E>): Result<U, E>;
    expectErr(msg: (() => string) | string): E;
    unwrapErr(): E;
    unwrapErrOr(def: E): E;
    unwrapErrOrElse(defFn: (value: T) => E): E;
    mapErr<U>(fn: (err: E) => U): Result<T, U>;
    mapErrOr<U>(fn: (err: E) => U, def: U): Result<T, U>;
    mapErrOrElse<U>(fn: (err: E) => U, defFn: (value: T) => U): Result<T, U>;
    flatMapErr<U>(fn: (err: E) => Result<T, U>): Result<T, U>;
    flatMapErrOr<U>(fn: (err: E) => Result<T, U>, def: Result<T, U>): Result<T, U>;
    flatMapErrOrElse<U>(fn: (err: E) => Result<T, U>, defFn: (value: T) => Result<T, U>): Result<T, U>;
    and<U>(ok: Result<U, E>): Result<U, E>;
    andThen<U>(fn: (value: T) => Result<U, E>): Result<U, E>;
    or(ok: Result<T, E>): Result<T, E>;
    orElse(fn: (error: E) => Result<T, E>): Result<T, E>;
    ifOk(fn: (ok: T) => void, errFn?: (err: E) => void): Result<T, E>;
    ifErr(fn: (err: E) => void, okFn?: (ok: T) => void): Result<T, E>;
    fromJSON(json: any): Result<T, E>;
    toJSON(): IResultOk<T> | IResultErr<E>;
    toJS(): IResultOk<T> | IResultErr<E>;
}
interface IResultOk<T> {
    ok: T;
}
interface IResultErr<E> {
    err: E;
}
declare const ok: <T, E = Error>(value: T) => Result<T, E>;
declare const err: <T, E = Error>(error: E) => Result<T, E>;

declare class Option<T> {
    static some<T>(value: T): Option<T>;
    static none<T>(): Option<T>;
    static from<T>(value?: T | null): Option<T>;
    static fromResult<T, E = Error>(result: Result<T, E>): Option<T>;
    private _value;
    constructor(createSecret: unknown, value: T);
    isNone(): boolean;
    isSome(): boolean;
    expect(msg: (() => string) | string): T;
    unwrap(): T;
    unwrapOr(def: T): T;
    unwrapOrElse(defFn: () => T): T;
    map<U>(fn: (value: T) => U): Option<U>;
    mapOr<U>(fn: (value: T) => U, def: U): Option<U>;
    mapOrElse<U>(fn: (value: T) => U, defFn: () => U): Option<U>;
    flatMap<U>(fn: (value: T) => Option<U>): Option<U>;
    flatMapOr<U>(fn: (value: T) => Option<U>, def: Option<U>): Option<U>;
    flatMapOrElse<U>(fn: (value: T) => Option<U>, defFn: () => Option<U>): Option<U>;
    and<U>(value: Option<U>): Option<U>;
    andThen<U>(fn: (value: T) => Option<U>): Option<U>;
    or(value: Option<T>): Option<T>;
    orElse(fn: () => Option<T>): Option<T>;
    xor(value: Option<T>): Option<T>;
    filter<S extends T>(fn: (value: T) => value is S): Option<S>;
    filter(fn: (value: T) => boolean): Option<T>;
    getOrInsert(value: T): Option<T>;
    getOrInsertWith(fn: () => T): Option<T>;
    take(): Option<T>;
    from(value?: T | null): Option<T>;
    replace(value: T): Option<T>;
    clear(): Option<T>;
    fromResult<T, E>(result: Result<T, E>): Option<T>;
    ifSome(fn: (value: T) => void, elseFn?: () => void): Option<T>;
    ifNone(fn: () => void, elseFn?: (value: T) => void): Option<T>;
    fromJSON(json: T | null): Option<T>;
    toJSON(): T | null;
    toJS(): T | null;
}
declare const some: <T>(value: T) => Option<T>;
declare const none: <T>() => Option<T>;

declare type IFilterPredicateFn<T, S extends T> = (value: T, index: number) => value is S;
declare type IFilterBooleanFn<T> = (value: T, index: number) => boolean;
declare class Filter<T, S extends T> extends Iter<S> {
    private _fn;
    constructor(iter: Iterator<T>, fn: IFilterBooleanFn<T> | IFilterPredicateFn<T, S>);
    next(): IteratorResult<S, undefined>;
}

declare type IForEachFn<T> = (value: T, index: number) => void;
declare class ForEach<T> extends Iter<T> {
    private _fn;
    constructor(iter: Iterator<T>, fn: IForEachFn<T>);
    next(): IteratorResult<T, undefined>;
}

declare type IMapFn<A, B> = (value: A, index: number) => B;
declare class Map<A, B> extends Iter<B> {
    private _fn;
    constructor(iter: Iterator<A>, fn: IMapFn<A, B>);
    next(): IteratorResult<B, undefined>;
}

declare class Merge<T> extends Iter<T> {
    private _other;
    constructor(iter: Iterator<T>, other: Iterator<T>);
    next(): IteratorResult<T, undefined>;
}

declare class Skip<T> extends Iter<T> {
    private _skipped;
    private _skip;
    constructor(iter: Iterator<T>, skip: number);
    next(): IteratorResult<T, undefined>;
}

declare class Step<T> extends Iter<T> {
    private _stepped;
    private _step;
    constructor(iter: Iterator<T>, step: number);
    next(): IteratorResult<T, undefined>;
}

declare class Take<T> extends Iter<T> {
    private _taken;
    private _count;
    constructor(iter: Iterator<T>, count: number);
    next(): IteratorResult<T, undefined>;
}

declare type IToMapFn<A, B> = (value: A, index: number) => B;
declare class ToMap<T, K extends string | number | symbol, V> extends Iter<[
    K,
    V
]> {
    private _map;
    constructor(iter: Iterator<T>, keyFn?: IToMapFn<T, K>, valueFn?: IToMapFn<T, V>);
    toObject(): Record<K, V>;
    next(): IteratorResult<[K, V], undefined>;
}

declare type UnflattenFn<T, U> = (iter: Iterator<T>) => IteratorResult<U>;
declare class Unflatten<T, U> extends Iter<U> {
    private _fn;
    constructor(iter: Iterator<T>, fn: UnflattenFn<T, U>);
    next(): IteratorResult<U>;
}

declare class Enumerate<T> extends Iter<[number, T]> {
    constructor(iter: Iterator<T>);
    next(): IteratorResult<[number, T], undefined>;
}

declare class Peekable<T> extends Iter<T> {
    private peeked;
    unpeekAll(): this;
    unpeek(): Option<T>;
    peek(offset?: number): Option<T>;
    next(): IteratorResult<T, undefined>;
}

declare class Iter<T> implements Iterable<T>, Iterator<T, undefined, undefined>, IterableIterator<T> {
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
declare function iter<T>(value: T[] | Iterator<T> | Iter<T> | Iterable<T>): Iter<T>;
declare function iter<O>(value: O | Iterable<[keyof O, O[keyof O]]>): Iter<[keyof O, O[keyof O]]>;

declare enum RangeDirection {
    Forward = 0,
    Backward = 1
}
declare class Range implements Iterator<number>, Iterable<number> {
    static from(start: number, end: number, step?: number): Range;
    private start;
    private end;
    private step;
    private direction;
    constructor(start: number, end: number, step?: number);
    getStart(): number;
    getEnd(): number;
    getStep(): number;
    getDirection(): RangeDirection;
    contains(item: number): boolean;
    isEmpty(): boolean;
    iter(): Iter<number>;
    [Symbol.iterator](): this;
    next(): IteratorResult<number>;
}
declare const range: typeof Range.from;

declare class RangeFrom extends Range {
    static from(start: number, direction?: RangeDirection, step?: number): RangeFrom;
    constructor(start: number, direction?: RangeDirection, step?: number);
}
declare const rangeFrom: typeof RangeFrom.from;

declare type IConstructor<T, A extends any[] = any[]> = new (...args: A) => T;

declare function toJS(value: any): any;

declare function toJSON(value: any): any;

export { Enumerate, FastHasher, Filter, ForEach, Hasher, IConstructor, IResultErr, IResultOk, Iter, Map, Merge, Option, Peekable, Range, RangeDirection, RangeFrom, Result, Skip, Step, Take, ToMap, Unflatten, bytesToInteger, defaultHasher, err, hash, hashOf, integerToBytes, iter, none, ok, range, rangeFrom, some, toJS, toJSON };
