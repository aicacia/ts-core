import { Hasher } from "./Hasher";
export declare function hashOf(value: any, getHasher?: () => Hasher): number;
export declare function hash<H extends Hasher = Hasher>(value: any, hasher: H): H;
