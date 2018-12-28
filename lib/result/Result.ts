const CREATE_SECRET = {},
  NULL_SECRET = {};

type ISecret = {};

export class Result<T, E = Error> {
  private _ok: T;
  private _err: E;

  constructor(createSecret: ISecret, ok: T, err: E) {
    if (createSecret !== CREATE_SECRET) {
      throw new TypeError(
        "Results can only be created with the ok or err functions"
      );
    }
    this._ok = ok;
    this._err = err;
  }

  isErr(): boolean {
    return this._err !== NULL_SECRET;
  }

  isOk(): boolean {
    return this._ok !== NULL_SECRET;
  }

  expect(): T {
    if (this.isOk()) {
      return this._ok;
    } else {
      throw this._err;
    }
  }

  unwrap(): T {
    return this.expect();
  }
  unwrapOr(def: T): T {
    if (this.isOk()) {
      return this._ok;
    } else {
      return def;
    }
  }
  unwrapOrElse(defFn: () => T): T {
    if (this.isOk()) {
      return this._ok;
    } else {
      return defFn();
    }
  }

  map<U>(fn: (ok: T) => U): Result<U, E> {
    if (this.isOk()) {
      return ok(fn(this._ok));
    } else {
      return err(this._err);
    }
  }
  mapOr<U>(def: U, fn: (ok: T) => U): Result<U, E> {
    if (this.isOk()) {
      return ok(fn(this._ok));
    } else {
      return ok(def);
    }
  }
  mapOrElse<U>(defFn: () => U, fn: (ok: T) => U): Result<U, E> {
    if (this.isOk()) {
      return ok(fn(this._ok));
    } else {
      return ok(defFn());
    }
  }

  expectErr(msg: string): E {
    if (this.isErr()) {
      return this._err;
    } else {
      throw new Error(msg);
    }
  }

  unwrapErr(): E {
    return this.expectErr("Tried to unwrap error value of ok Result");
  }
  unwrapErrOr(def: E): E {
    if (this.isErr()) {
      return this._err;
    } else {
      return def;
    }
  }
  unwrapErrOrElse(defFn: () => E): E {
    if (this.isErr()) {
      return this._err;
    } else {
      return defFn();
    }
  }

  mapErr<U>(fn: (err: E) => U): Result<T, U> {
    if (this.isErr()) {
      return err(fn(this._err));
    } else {
      return ok(this._ok);
    }
  }
  mapErrOr<U>(def: U, fn: (err: E) => U): Result<T, U> {
    if (this.isErr()) {
      return err(fn(this._err));
    } else {
      return err(def);
    }
  }
  mapErrOrElse<U>(defFn: () => U, fn: (err: E) => U): Result<T, U> {
    if (this.isErr()) {
      return err(fn(this._err));
    } else {
      return err(defFn());
    }
  }

  and<U>(ok: Result<U, E>): Result<U, E> {
    if (this.isOk()) {
      return ok;
    } else {
      return err(this._err);
    }
  }
  andThen<U>(fn: () => Result<U, E>): Result<U, E> {
    if (this.isOk()) {
      return fn();
    } else {
      return err(this._err);
    }
  }

  or(ok: Result<T, E>): Result<T, E> {
    if (this.isErr()) {
      return ok;
    } else {
      return this;
    }
  }
  orElse(fn: () => Result<T, E>): Result<T, E> {
    if (this.isErr()) {
      return fn();
    } else {
      return this;
    }
  }

  ok(): Option<T> {
    if (this.isOk()) {
      return some(this._ok);
    } else {
      return none();
    }
  }
  err(): Option<E> {
    if (this.isErr()) {
      return some(this._err);
    } else {
      return none();
    }
  }
}

export const ok = <T, E>(ok: T): Result<T, E> =>
  new Result(CREATE_SECRET, ok, NULL_SECRET as any);
export const err = <T, E>(err: E): Result<T, E> =>
  new Result(CREATE_SECRET, NULL_SECRET as any, err);

import { Option, some, none } from "../option/Option";
