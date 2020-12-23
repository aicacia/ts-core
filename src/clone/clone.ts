export interface IClone {
  clone(): ThisType<this>;
}

export function clone<T extends IClone>(value: T) {
  return value.clone();
}

export function safeClone(value: any) {
  if (value != null && typeof value.clone === "function") {
    return clone(value);
  } else {
    return value;
  }
}
