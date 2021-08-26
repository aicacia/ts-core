import { Iter } from "./Iter";
export declare type UnflattenFn<T, U> = (iter: Iterator<T>) => IteratorResult<U>;
export declare class Unflatten<T, U> extends Iter<U> {
    private _fn;
    constructor(iter: Iterator<T>, fn: UnflattenFn<T, U>);
    next(): IteratorResult<U>;
}
