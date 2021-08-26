import { FastHasher } from "./FastHasher";
export function defaultHasher() {
    return new FastHasher();
}
