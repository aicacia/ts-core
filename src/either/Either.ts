const CREATE_SECRET = {},
  NULL_SECRET = {};

export class Either<L, R> implements IEquals<Either<L, R>>, IClone {
  static equals<L, R>(a: Either<L, R>, b: Either<L, R>): boolean {
    return a.equals(b);
  }

  static left<L, R>(value: L): Either<L, R> {
    return left(value);
  }
  static right<L, R>(value: R): Either<L, R> {
    return right(value);
  }

  private _left: L;
  private _right: R;

  constructor(createSecret: unknown, left: L, right: R) {
    if (createSecret !== CREATE_SECRET) {
      throw new TypeError(
        "Eithers can only be created with the left or right functions"
      );
    }
    this._left = left;
    this._right = right;
  }

  isLeft(): boolean {
    return this._left !== NULL_SECRET;
  }

  isRight(): boolean {
    return this._right !== NULL_SECRET;
  }

  expectLeft(msg: (() => string) | string): L {
    return this.left().expect(msg);
  }

  unwrapLeft(): L {
    return this.expectLeft("Tried to unwrap left value of right Either");
  }
  unwrapLeftOr(def: L): L {
    return this.left().unwrapOr(def);
  }
  unwrapLeftOrElse(defFn: () => L): L {
    return this.left().unwrapOrElse(defFn);
  }

  mapLeft<U>(fn: (left: L) => U): Either<U, R> {
    if (this.isLeft()) {
      return left(fn(this._left));
    } else {
      return right(this._right);
    }
  }
  mapLeftOr<U>(fn: (left: L) => U, def: U): Either<U, R> {
    if (this.isLeft()) {
      return left(fn(this._left));
    } else {
      return left(def);
    }
  }
  mapLeftOrElse<U>(fn: (left: L) => U, defFn: () => U): Either<U, R> {
    if (this.isLeft()) {
      return left(fn(this._left));
    } else {
      return left(defFn());
    }
  }

  flatMapLeft<U>(fn: (left: L) => Either<U, R>): Either<U, R> {
    if (this.isLeft()) {
      return fn(this._left);
    } else {
      return right(this._right);
    }
  }
  flatMapLeftOr<U>(
    fn: (left: L) => Either<U, R>,
    def: Either<U, R>
  ): Either<U, R> {
    if (this.isLeft()) {
      return fn(this._left);
    } else {
      return def;
    }
  }
  flatMapLeftOrElse<U>(
    fn: (left: L) => Either<U, R>,
    defFn: () => Either<U, R>
  ): Either<U, R> {
    if (this.isLeft()) {
      return fn(this._left);
    } else {
      return defFn();
    }
  }

  expectRight(msg: (() => string) | string): R {
    return this.right().expect(msg);
  }

  unwrapRight(): R {
    return this.expectRight("Tried to unwrap right value of left Either");
  }
  unwrapRightOr(def: R): R {
    return this.right().unwrapOr(def);
  }
  unwrapRightOrElse(defFn: () => R): R {
    return this.right().unwrapOrElse(defFn);
  }

  mapRight<U>(fn: (right: R) => U): Either<L, U> {
    if (this.isRight()) {
      return right(fn(this._right));
    } else {
      return left(this._left);
    }
  }
  mapRightOr<U>(fn: (right: R) => U, def: U): Either<L, U> {
    if (this.isRight()) {
      return right(fn(this._right));
    } else {
      return right(def);
    }
  }
  mapRightOrElse<U>(fn: (right: R) => U, defFn: () => U): Either<L, U> {
    if (this.isRight()) {
      return right(fn(this._right));
    } else {
      return right(defFn());
    }
  }

  flatMapRight<U>(fn: (right: R) => Either<L, U>): Either<L, U> {
    if (this.isRight()) {
      return fn(this._right);
    } else {
      return left(this._left);
    }
  }
  flatMapRightOr<U>(
    fn: (right: R) => Either<L, U>,
    def: Either<L, U>
  ): Either<L, U> {
    if (this.isRight()) {
      return fn(this._right);
    } else {
      return def;
    }
  }
  flatMapRightOrElse<U>(
    fn: (right: R) => Either<L, U>,
    defFn: () => Either<L, U>
  ): Either<L, U> {
    if (this.isRight()) {
      return fn(this._right);
    } else {
      return defFn();
    }
  }

  leftAnd<T>(other: Either<T, R>): Either<T, R> {
    if (this.isLeft()) {
      return other;
    } else {
      return right(this._right);
    }
  }
  leftAndThen<T>(fn: () => Either<T, R>): Either<T, R> {
    if (this.isLeft()) {
      return fn();
    } else {
      return right(this._right);
    }
  }

  rightAnd<T>(other: Either<L, T>): Either<L, T> {
    if (this.isRight()) {
      return other;
    } else {
      return left(this._left);
    }
  }
  rightAndThen<T>(fn: () => Either<L, T>): Either<L, T> {
    if (this.isRight()) {
      return fn();
    } else {
      return left(this._left);
    }
  }

  left(): Option<L> {
    if (this.isLeft()) {
      return some(this._left);
    } else {
      return none();
    }
  }
  right(): Option<R> {
    if (this.isRight()) {
      return some(this._right);
    } else {
      return none();
    }
  }

  ifLeft(fn: (left: L) => void): Either<L, R> {
    if (this.isLeft()) {
      fn(this._left);
    }
    return this;
  }
  ifRight(fn: (right: R) => void): Either<L, R> {
    if (this.isRight()) {
      fn(this._right);
    }
    return this;
  }

  equals(other: Either<L, R>): boolean {
    return (
      safeEquals(this._left, other._left) &&
      safeEquals(this._right, other._right)
    );
  }

  clone(): Either<L, R> {
    return new Either(
      CREATE_SECRET,
      safeClone(this._left),
      safeClone(this._right)
    );
  }

  fromJSON(json: any): Either<L, R> {
    if (json) {
      if (json.left) {
        return left(json.left);
      } else if (json.right) {
        return right(json.right);
      }
    }
    throw new TypeError("Invalid json for Either");
  }
  toJSON(): IEitherLeftJSON<L> | IEitherRightJSON<R> {
    if (this.isLeft()) {
      return {
        left: this.mapLeft(toJSON).unwrapLeft(),
      };
    } else {
      return {
        right: this.mapRight(toJSON).unwrapRight(),
      };
    }
  }
}

export interface IEitherLeftJSON<L> {
  left: L;
}
export interface IEitherRightJSON<R> {
  right: R;
}

export const left = <L, R>(value: L): Either<L, R> =>
  new Either(CREATE_SECRET, value, NULL_SECRET as R);
export const right = <L, R>(right: R): Either<L, R> =>
  new Either(CREATE_SECRET, NULL_SECRET as L, right);

import { safeClone, IClone } from "../clone";
import { IEquals, safeEquals } from "../equals";
import { none, Option, some } from "../option";
import { toJSON } from "../toJSON";
