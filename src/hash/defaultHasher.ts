import { FastHasher } from "./FastHasher";
import { Hasher } from "./Hasher";

export function defaultHasher(): Hasher {
  return new FastHasher();
}
