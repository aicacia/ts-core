import { Iter } from "./Iter";
export declare class Take<T> extends Iter<T> {
    private _taken;
    private _count;
    constructor(iter: Iterator<T>, count: number);
    next(): IteratorResult<T, undefined>;
}
