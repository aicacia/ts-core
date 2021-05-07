import { Iter } from "./Iter";
export declare type IToMapFn<A, B> = (value: A, index: number) => B;
export declare const defaultKeyFn: <A, B>(key: A) => B;
export declare const defaultValueFn: <A, B>(value: A) => B;
export declare class ToMap<T, K extends string | number | symbol, V> extends Iter<[
    K,
    V
]> {
    private _map;
    constructor(iter: Iterator<T>, keyFn: IToMapFn<T, K>, valueFn: IToMapFn<T, V>);
    toObject(): Record<K, V>;
    next(): IteratorResult<[K, V], undefined>;
}
