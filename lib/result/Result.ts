const CREATE_SECRET: ISecret = {},
  NULL_SECRET: ISecret = {};

type ISecret = {};

export class Result<T, E = Error> implements IEquals<Result<T, E>>, IClone {
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

  equals(other: Result<T, E>): boolean {
    return safeEquals(this._ok, other._ok) && safeEquals(this._err, other._err);
  }

  clone(): this {
    return new Result(CREATE_SECRET, this._ok, this._err) as this;
  }

  static equals<T, E = Error>(a: Result<T, E>, b: Result<T, E>): boolean {
    return a.equals(b);
  }

  static ok<T, E = Error>(value: T): Result<T, E> {
    return ok(value);
  }
  static err<T, E = Error>(error: E): Result<T, E> {
    return err(error);
  }
}

export const ok = <T, E = Error>(value: T): Result<T, E> =>
  new Result(CREATE_SECRET, value, NULL_SECRET as any);
export const err = <T, E = Error>(error: E): Result<T, E> =>
  new Result(CREATE_SECRET, NULL_SECRET as any, error);

import { Option, some, none } from "../option/Option";
import { IEquals, safeEquals } from "../equals";
import { IClone } from "../clone";
