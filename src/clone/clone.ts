export interface IClone {
  clone(): ThisType<this>;
}

export const clone = <T extends IClone>(value: T) => value.clone();

export const safeClone = (value: any) => {
  if (typeof value.clone === "function") {
    return clone(value);
  } else {
    return value;
  }
};
