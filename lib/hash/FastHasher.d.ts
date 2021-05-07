import { Hasher } from "./Hasher";
export declare class FastHasher extends Hasher {
    private hash;
    finish(): number;
    write(bytes: Uint8Array | number[]): this;
}
