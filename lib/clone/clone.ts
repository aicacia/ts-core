export interface IClone {
  clone(): this;
}

export const clone = <T extends IClone>(value: T) => value.clone();
