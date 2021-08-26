import { Iter } from "../iter";
export declare enum RangeDirection {
    Forward = 0,
    Backward = 1
}
export declare class Range implements Iterator<number>, Iterable<number> {
    static from(start: number, end: number, step?: number): Range;
    private start;
    private end;
    private step;
    private direction;
    constructor(start: number, end: number, step?: number);
    getStart(): number;
    getEnd(): number;
    getStep(): number;
    getDirection(): RangeDirection;
    contains(item: number): boolean;
    isEmpty(): boolean;
    iter(): Iter<number>;
    [Symbol.iterator](): this;
    next(): IteratorResult<number>;
}
export declare const range: typeof Range.from;
