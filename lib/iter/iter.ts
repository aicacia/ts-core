import { Iterator } from "./Iterator";
import { IIterator } from "./IIterator";
import { Option, none, some } from "../option";

export function iter<T>(value: T[]): Iterator<T>;
export function iter<T>(value: any): Iterator<[string, T]>;

export function iter(value: any): Iterator<any> {
    const type = typeof value;

    if (type === "object") {
        if (typeof value.length === "number") {
            return new Iterator(new ArrayIterator(value));
        } else {
            return new Iterator(new ObjectIterator(value));
        }
    } else {
        return new Iterator(new ArrayIterator([value] as any));
    }
}

class ArrayIterator<T> implements IIterator<T> {
    private _array: T[];
    private _index: number;
    private _length: number;

    constructor(array: T[]) {
        this._array = array;
        this._index = 0;
        this._length = array.length;
    }

    next(): Option<T> {
        if (this._index < this._length) {
            return some(this._array[this._index++]);
        } else {
            return none();
        }
    }
}

class ObjectIterator<T> extends ArrayIterator<[string, T]> {
    constructor(object: {}) {
        super(Object.entries(object));
    }
}

declare global {
    interface Array<T> {
        iter(): Iterator<T>;
    }
}

Array.prototype.iter = function(): Iterator<any> {
    return new Iterator(iter(this));
};

declare global {
    interface Object {
        iter<V>(): Iterator<[string, V]>;
    }
}

Object.prototype.iter = function<V>(): Iterator<[string, V]> {
    return new Iterator(iter(this) as any);
};
