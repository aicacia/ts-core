import { Iter } from "./Iter";
export declare class Merge<T> extends Iter<T> {
    private _other;
    constructor(iter: Iterator<T>, other: Iterator<T>);
    next(): IteratorResult<T, undefined>;
}
