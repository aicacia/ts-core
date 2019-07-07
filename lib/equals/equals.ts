import { isFunction } from "util";

export interface IEquals<T> {
  equals(other: T): boolean;
}

export const equals = <A extends IEquals<B>, B>(a: A, b: B) => a.equals(b);

export const safeEquals = (a: any, b: any) => {
  if (isFunction(a.equals)) {
    return a.equals(b);
  } else {
    return a === b;
  }
};
