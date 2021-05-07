import { Iter } from "./Iter";
export declare type IFilterPredicateFn<T, S extends T> = (value: T, index: number) => value is S;
export declare type IFilterBooleanFn<T> = (value: T, index: number) => boolean;
export declare class Filter<T, S extends T> extends Iter<S> {
    private _fn;
    constructor(iter: Iterator<T>, fn: IFilterBooleanFn<T> | IFilterPredicateFn<T, S>);
    next(): IteratorResult<S, undefined>;
}
