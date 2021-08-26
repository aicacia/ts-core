import { Range, RangeDirection } from "./Range";
export declare class RangeFrom extends Range {
    static from(start: number, direction?: RangeDirection, step?: number): RangeFrom;
    constructor(start: number, direction?: RangeDirection, step?: number);
}
export declare const rangeFrom: typeof RangeFrom.from;
