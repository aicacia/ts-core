import { Range, RangeDirection } from "./Range";
export declare class RangeFrom extends Range {
    static from(start: number, direction?: RangeDirection): RangeFrom;
    constructor(start: number, direction?: RangeDirection);
}
export declare const rangeFrom: typeof RangeFrom.from;
