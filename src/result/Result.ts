const CREATE_SECRET = {},
  NULL_SECRET = {};

export class Result<T, E = Error> {
  static ok<T, E = Error>(value: T): Result<T, E> {
    return ok(value);
  }
  static err<T, E = Error>(error: E): Result<T, E> {
    return err(error);
  }

  private _ok: T;
  private _err: E;

  constructor(createSecret: unknown, ok: T, err: E) {
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
    return this.ok().unwrapOr(def);
  }
  unwrapOrElse(defFn: (error: E) => T): T {
    if (this.isOk()) {
      return this._ok;
    } else {
      return defFn(this._err);
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
  mapOrElse<U>(fn: (ok: T) => U, defFn: (error: E) => U): Result<U, E> {
    if (this.isOk()) {
      return ok(fn(this._ok));
    } else {
      return ok(defFn(this._err));
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
    defFn: (error: E) => Result<U, E>
  ): Result<U, E> {
    if (this.isOk()) {
      return fn(this._ok);
    } else {
      return defFn(this._err);
    }
  }

  expectErr(msg: (() => string) | string): E {
    return this.err().expect(msg);
  }

  unwrapErr(): E {
    return this.expectErr("Tried to unwrap error value of ok Result");
  }
  unwrapErrOr(def: E): E {
    return this.err().unwrapOr(def);
  }
  unwrapErrOrElse(defFn: (value: T) => E): E {
    if (this.isErr()) {
      return this._err;
    } else {
      return defFn(this._ok);
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
  mapErrOrElse<U>(fn: (err: E) => U, defFn: (value: T) => U): Result<T, U> {
    if (this.isErr()) {
      return err(fn(this._err));
    } else {
      return err(defFn(this._ok));
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
    defFn: (value: T) => Result<T, U>
  ): Result<T, U> {
    if (this.isErr()) {
      return fn(this._err);
    } else {
      return defFn(this._ok);
    }
  }

  and<U>(ok: Result<U, E>): Result<U, E> {
    if (this.isOk()) {
      return ok;
    } else {
      return err(this._err);
    }
  }
  andThen<U>(fn: (value: T) => Result<U, E>): Result<U, E> {
    if (this.isOk()) {
      return fn(this._ok);
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
  orElse(fn: (error: E) => Result<T, E>): Result<T, E> {
    if (this.isErr()) {
      return fn(this._err);
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
  toJSON(): IResultOk<T> | IResultErr<E> {
    if (this.isOk()) {
      return {
        ok: this.map(toJSON).unwrap(),
      };
    } else {
      return {
        err: this.mapErr(toJSON).unwrapErr(),
      };
    }
  }
  toJS(): IResultOk<T> | IResultErr<E> {
    if (this.isOk()) {
      return {
        ok: this.map(toJS).unwrap(),
      };
    } else {
      return {
        err: this.mapErr(toJS).unwrapErr(),
      };
    }
  }
}

export interface IResultOk<T> {
  ok: T;
}
export interface IResultErr<E> {
  err: E;
}

export const ok = <T, E = Error>(value: T): Result<T, E> =>
  new Result(CREATE_SECRET, value, NULL_SECRET as E);
export const err = <T, E = Error>(error: E): Result<T, E> =>
  new Result(CREATE_SECRET, NULL_SECRET as T, error);

import { none, Option, some } from "../option";
import { toJS } from "../toJS";
import { toJSON } from "../toJSON";
