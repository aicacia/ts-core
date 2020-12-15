import { Hasher } from "./Hasher";

export interface IHash<H extends Hasher> {
  hash(hasher: H): this;
}

export function hash<H extends Hasher, T extends IHash<H> = IHash<H>>(
  value: T,
  hasher: H
) {
  return value.hash(hasher);
}
