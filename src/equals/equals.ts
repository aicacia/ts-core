export interface IEquals<T> {
  equals(other: T): boolean;
}

export const equals = <A extends IEquals<B>, B>(a: A, b: B) => a.equals(b);

export const safeEquals = (a: any, b: any) => {
  if (typeof a.equals === "function") {
    return a.equals(b);
  } else {
    return a === b;
  }
};
