export declare class Result<T, E = Error> {
    static ok<T, E = Error>(value: T): Result<T, E>;
    static err<T, E = Error>(error: E): Result<T, E>;
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
    ok(): Option<T>;
    err(): Option<E>;
    ifOk(fn: (ok: T) => void, errFn?: (err: E) => void): Result<T, E>;
    ifErr(fn: (err: E) => void, okFn?: (ok: T) => void): Result<T, E>;
    fromJSON(json: any): Result<T, E>;
    toJSON(): IResultOk<T> | IResultErr<E>;
    toJS(): IResultOk<T> | IResultErr<E>;
}
export interface IResultOk<T> {
    ok: T;
}
export interface IResultErr<E> {
    err: E;
}
export declare const ok: <T, E = Error>(value: T) => Result<T, E>;
export declare const err: <T, E = Error>(error: E) => Result<T, E>;
import { Option } from "../option";
