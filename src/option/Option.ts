import type { Result } from "../result";
import { toJS } from "../toJS";
import { toJSON } from "../toJSON";

const CREATE_SECRET = {},
  NULL_SECRET = {};

export class Option<T> {
  static some<T>(value: T): Option<T> {
    return some(value);
  }
  static none<T>(): Option<T> {
    return none();
  }

  static from<T>(value?: T | null): Option<T> {
    if (value != null) {
      return some(value);
    } else {
      return none();
    }
  }
  static fromResult<T, E = Error>(result: Result<T, E>): Option<T> {
    if (result.isOk()) {
      return some(result.unwrap());
    } else {
      return none();
    }
  }

  private _value: T;

  constructor(createSecret: unknown, value: T) {
    if (createSecret !== CREATE_SECRET) {
      throw new TypeError(
        "Options can only be created with the some or none functions"
      );
    }
    this._value = value;
  }

  isNone(): boolean {
    return this._value === NULL_SECRET;
  }

  isSome(): boolean {
    return !this.isNone();
  }

  expect(msg: (() => string) | string): T {
    if (this.isSome()) {
      return this._value;
    } else {
      throw new Error(typeof msg === "function" ? msg() : msg);
    }
  }

  unwrap(): T {
    return this.expect("Tried to unwrap value of none Option");
  }
  unwrapOr(def: T): T {
    if (this.isSome()) {
      return this._value;
    } else {
      return def;
    }
  }
  unwrapOrElse(defFn: () => T): T {
    if (this.isSome()) {
      return this._value;
    } else {
      return defFn();
    }
  }

  map<U>(fn: (value: T) => U): Option<U> {
    if (this.isSome()) {
      return some(fn(this._value));
    } else {
      return none();
    }
  }
  mapOr<U>(fn: (value: T) => U, def: U): Option<U> {
    if (this.isSome()) {
      return some(fn(this._value));
    } else {
      return some(def);
    }
  }
  mapOrElse<U>(fn: (value: T) => U, defFn: () => U): Option<U> {
    if (this.isSome()) {
      return some(fn(this._value));
    } else {
      return some(defFn());
    }
  }

  flatMap<U>(fn: (value: T) => Option<U>): Option<U> {
    if (this.isSome()) {
      return fn(this._value);
    } else {
      return none();
    }
  }
  flatMapOr<U>(fn: (value: T) => Option<U>, def: Option<U>): Option<U> {
    if (this.isSome()) {
      return fn(this._value);
    } else {
      return def;
    }
  }
  flatMapOrElse<U>(
    fn: (value: T) => Option<U>,
    defFn: () => Option<U>
  ): Option<U> {
    if (this.isSome()) {
      return fn(this._value);
    } else {
      return defFn();
    }
  }

  and<U>(value: Option<U>): Option<U> {
    if (this.isSome()) {
      return value;
    } else {
      return none();
    }
  }
  andThen<U>(fn: (value: T) => Option<U>): Option<U> {
    if (this.isSome()) {
      return fn(this._value);
    } else {
      return none();
    }
  }

  or(value: Option<T>): Option<T> {
    if (this.isNone()) {
      return value;
    } else {
      return this;
    }
  }
  orElse(fn: () => Option<T>): Option<T> {
    if (this.isNone()) {
      return fn();
    } else {
      return this;
    }
  }

  xor(value: Option<T>): Option<T> {
    const a = this.isSome(),
      b = value.isSome();

    if (a && !b) {
      return this;
    } else if (!a && b) {
      return value;
    } else {
      return none();
    }
  }

  filter<S extends T>(fn: (value: T) => value is S): Option<S>;
  filter(fn: (value: T) => boolean): Option<T>;
  filter(fn: any): any {
    if (this.isSome() && fn(this._value)) {
      return this;
    } else {
      return none();
    }
  }

  getOrInsert(value: T): Option<T> {
    if (this.isNone()) {
      this._value = value;
    }
    return this;
  }
  getOrInsertWith(fn: () => T): Option<T> {
    if (this.isNone()) {
      this._value = fn();
    }
    return this;
  }

  take(): Option<T> {
    if (this.isSome()) {
      const value = this._value;
      this._value = NULL_SECRET as any;
      return some(value);
    } else {
      return none();
    }
  }
  from(value?: T | null): Option<T> {
    if (value != null) {
      this._value = value;
    } else {
      this.clear();
    }
    return this;
  }
  replace(value: T): Option<T> {
    this._value = value;
    return this;
  }
  clear(): Option<T> {
    this._value = NULL_SECRET as any;
    return this;
  }

  fromResult<T, E>(result: Result<T, E>): Option<T> {
    if (result.isOk()) {
      return some(result.unwrap());
    } else {
      return none();
    }
  }

  ifSome(fn: (value: T) => void, elseFn?: () => void): Option<T> {
    if (this.isSome()) {
      fn(this._value);
    } else if (elseFn) {
      elseFn();
    }
    return this;
  }
  ifNone(fn: () => void, elseFn?: (value: T) => void): Option<T> {
    if (this.isNone()) {
      fn();
    } else if (elseFn) {
      elseFn(this._value);
    }
    return this;
  }

  fromJSON(json: T | null): Option<T> {
    return Option.from(json);
  }
  toJSON(): T | null {
    return this.map(toJSON).unwrapOr(null as any);
  }
  toJS(): T | null {
    return this.map(toJS).unwrapOr(null as any);
  }
}

export const some = <T>(value: T): Option<T> =>
  new Option(CREATE_SECRET, value);
export const none = <T>(): Option<T> =>
  new Option(CREATE_SECRET, NULL_SECRET as T);
