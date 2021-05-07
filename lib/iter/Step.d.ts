import { Iter } from "./Iter";
export declare class Step<T> extends Iter<T> {
    private _stepped;
    private _step;
    constructor(iter: Iterator<T>, step: number);
    next(): IteratorResult<T, undefined>;
}
