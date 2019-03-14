export interface IClone {
  clone(): ThisType<this>;
}

export const clone = <T extends IClone>(value: T) => value.clone();
