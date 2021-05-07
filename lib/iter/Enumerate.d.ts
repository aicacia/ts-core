import { Iter } from "./Iter";
export declare class Enumerate<T> extends Iter<[number, T]> {
    constructor(iter: Iterator<T>);
    next(): IteratorResult<[number, T], undefined>;
}
