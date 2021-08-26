import { Iter } from "./Iter";
export declare class Skip<T> extends Iter<T> {
    private _skipped;
    private _skip;
    constructor(iter: Iterator<T>, skip: number);
    next(): IteratorResult<T, undefined>;
}
