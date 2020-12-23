export interface IEquals<T> {
  equals(other: T): boolean;
}

export function equals<A extends IEquals<B>, B>(a: A, b: B) {
  return (a as any) === (b as any) || (a == null && b == null) || a.equals(b);
}

export function safeEquals(a: any, b: any) {
  if (a != null && typeof a.equals === "function") {
    return equals(a, b);
  } else {
    return a === b;
  }
}
