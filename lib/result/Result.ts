interface ISecret {}

const CREATE_SECRET: ISecret = {},
  NULL_SECRET: ISecret = {};

export class Result<T, E = Error> implements IEquals<Result<T, E>>, IClone {
  static equals<T, E = Error>(a: Result<T, E>, b: Result<T, E>): boolean {
    return a.equals(b);
  }

  static ok<T, E = Error>(value: T): Result<T, E> {
    return ok(value);
  }
  static err<T, E = Error>(error: E): Result<T, E> {
    return err(error);
  }

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
  mapOr<U>(fn: (ok: T) => U, def: U): Result<U, E> {
    if (this.isOk()) {
      return ok(fn(this._ok));
    } else {
      return ok(def);
    }
  }
  mapOrElse<U>(fn: (ok: T) => U, defFn: () => U): Result<U, E> {
    if (this.isOk()) {
      return ok(fn(this._ok));
    } else {
      return ok(defFn());
    }
  }

  flatMap<U>(fn: (ok: T) => Result<U, E>): Result<U, E> {
    if (this.isOk()) {
      return fn(this._ok);
    } else {
      return err(this._err);
    }
  }
  flatMapOr<U>(fn: (ok: T) => Result<U, E>, def: Result<U, E>): Result<U, E> {
    if (this.isOk()) {
      return fn(this._ok);
    } else {
      return def;
    }
  }
  flatMapOrElse<U>(
    fn: (ok: T) => Result<U, E>,
    defFn: () => Result<U, E>
  ): Result<U, E> {
    if (this.isOk()) {
      return fn(this._ok);
    } else {
      return defFn();
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
  mapErrOr<U>(fn: (err: E) => U, def: U): Result<T, U> {
    if (this.isErr()) {
      return err(fn(this._err));
    } else {
      return err(def);
    }
  }
  mapErrOrElse<U>(fn: (err: E) => U, defFn: () => U): Result<T, U> {
    if (this.isErr()) {
      return err(fn(this._err));
    } else {
      return err(defFn());
    }
  }

  flatMapErr<U>(fn: (err: E) => Result<T, U>): Result<T, U> {
    if (this.isErr()) {
      return fn(this._err);
    } else {
      return ok(this._ok);
    }
  }
  flatMapErrOr<U>(
    fn: (err: E) => Result<T, U>,
    def: Result<T, U>
  ): Result<T, U> {
    if (this.isErr()) {
      return fn(this._err);
    } else {
      return def;
    }
  }
  flatMapErrOrElse<U>(
    fn: (err: E) => Result<T, U>,
    defFn: () => Result<T, U>
  ): Result<T, U> {
    if (this.isErr()) {
      return fn(this._err);
    } else {
      return defFn();
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

  ifOk(fn: (ok: T) => void): Result<T, E> {
    if (this.isOk()) {
      fn(this._ok);
    }
    return this;
  }
  ifErr(fn: (err: E) => void): Result<T, E> {
    if (this.isErr()) {
      fn(this._err);
    }
    return this;
  }

  equals(other: Result<T, E>): boolean {
    return safeEquals(this._ok, other._ok) && safeEquals(this._err, other._err);
  }

  clone(): Result<T, E> {
    return new Result(CREATE_SECRET, this._ok, this._err);
  }

  fromJSON(json: any): Result<T, E> {
    if (json) {
      if (json.ok) {
        return ok(json.ok);
      } else if (json.err) {
        return err(json.err);
      }
    }
    throw new TypeError("Invalid json for Result");
  }
  toJSON(): IResultJSON<T> | IResultErrorJSON<E> {
    if (this.isOk()) {
      return {
        ok: this.unwrap()
      };
    } else {
      return {
        err: this.unwrapErr()
      };
    }
  }
}

export interface IResultJSON<T> {
  ok: T;
}
export interface IResultErrorJSON<E> {
  err: E;
}

export const ok = <T, E = Error>(value: T): Result<T, E> =>
  new Result(CREATE_SECRET, value, NULL_SECRET as E);
export const err = <T, E = Error>(error: E): Result<T, E> =>
  new Result(CREATE_SECRET, NULL_SECRET as T, error);

import { IClone } from "../clone";
import { IEquals, safeEquals } from "../equals";
import { none, Option, some } from "../option";
