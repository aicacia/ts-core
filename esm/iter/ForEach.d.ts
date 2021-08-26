import { Iter } from "./Iter";
export declare type IForEachFn<T> = (value: T, index: number) => void;
export declare class ForEach<T> extends Iter<T> {
    private _fn;
    constructor(iter: Iterator<T>, fn: IForEachFn<T>);
    next(): IteratorResult<T, undefined>;
}
