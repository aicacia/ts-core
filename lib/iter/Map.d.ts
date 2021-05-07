import { Iter } from "./Iter";
export declare type IMapFn<A, B> = (value: A, index: number) => B;
export declare class Map<A, B> extends Iter<B> {
    private _fn;
    constructor(iter: Iterator<A>, fn: IMapFn<A, B>);
    next(): IteratorResult<B, undefined>;
}
