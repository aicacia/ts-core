import { Option } from "../option";
import { Iter } from "./Iter";
export declare class Peekable<T> extends Iter<T> {
    private peeked;
    unpeekAll(): this;
    unpeek(): Option<T>;
    peek(offset?: number): Option<T>;
    next(): IteratorResult<T, undefined>;
}
