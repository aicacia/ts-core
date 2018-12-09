const SECRET = {};

export class Result<T, E = Error> {
    private _ok?: T;
    private _err?: E;

    constructor(secret: {}, ok?: T, err?: E) {
        if (secret !== SECRET) {
            throw new TypeError(
                "Results can only be created with the ok or err functions"
            );
        }
        this._ok = ok;
        this._err = err;
    }

    isErr(): boolean {
        return this._err !== void 0;
    }

    isOk(): boolean {
        return this._ok !== void 0;
    }

    expect(): T {
        if (this.isOk()) {
            return this._ok as T;
        } else {
            throw this._err;
        }
    }

    unwarp(): T {
        return this.expect();
    }
    unwarpOr(def: T): T {
        if (this.isOk()) {
            return this._ok as T;
        } else {
            return def;
        }
    }
    unwarpOrElse(defFn: () => T): T {
        if (this.isOk()) {
            return this._ok as T;
        } else {
            return defFn();
        }
    }

    map<U>(fn: (ok: T) => U): Result<U, E> {
        if (this.isOk()) {
            return new Result(SECRET, fn(this._ok as T));
        } else {
            return err(this._err as E);
        }
    }
    mapOr<U>(def: U, fn: (ok: T) => U): Result<U, E> {
        if (this.isOk()) {
            return new Result(SECRET, fn(this._ok as T));
        } else {
            return ok(def);
        }
    }
    mapOrElse<U>(defFn: () => U, fn: (ok: T) => U): Result<U, E> {
        if (this.isOk()) {
            return new Result(SECRET, fn(this._ok as T));
        } else {
            return ok(defFn());
        }
    }

    and<U>(ok: Result<U, E>): Result<U, E> {
        if (this.isOk()) {
            return ok;
        } else {
            return err(this._err as E);
        }
    }
    andThen<U>(fn: () => Result<U, E>): Result<U, E> {
        if (this.isOk()) {
            return fn();
        } else {
            return err(this._err as E);
        }
    }

    or(ok: Result<T, E>): Result<T, E> {
        if (!this.isOk()) {
            return ok;
        } else {
            return this;
        }
    }
    orElse(fn: () => Result<T, E>): Result<T, E> {
        if (!this.isOk()) {
            return fn();
        } else {
            return this;
        }
    }

    ok(): Option<T> {
        if (this.isOk()) {
            return some(this._ok as T);
        } else {
            return none();
        }
    }
    err(): Option<E> {
        if (this.isErr()) {
            return some(this._err as E);
        } else {
            return none();
        }
    }
}

export const ok = <T, E>(ok: T): Result<T, E> =>
    new Result(SECRET, ok, void 0 as any);
export const err = <T, E>(err: E): Result<T, E> =>
    new Result(SECRET, void 0 as any, err);

import { Option, some, none } from "../option/Option";
