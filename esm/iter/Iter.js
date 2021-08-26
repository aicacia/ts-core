import { none, some } from "../option";
export class Iter {
    constructor(iter) {
        this._index = 0;
        this._iter = iter;
    }
    [Symbol.iterator]() {
        return this;
    }
    iter() {
        return this;
    }
    next() {
        return this._iter.next();
    }
    nextWithIndex() {
        const next = this._iter.next();
        if (next.done) {
            return next;
        }
        else {
            return { value: [next.value, this._index++] };
        }
    }
    enumerate() {
        return undefined;
    }
    peekable() {
        return undefined;
    }
    forEach(_fn) {
        return undefined;
    }
    map(_fn) {
        return undefined;
    }
    merge(_iter) {
        return undefined;
    }
    concat(iter) {
        return this.merge(iter);
    }
    filter(_fn) {
        return undefined;
    }
    step(_step) {
        return undefined;
    }
    skip(_skip) {
        return undefined;
    }
    take(_count) {
        return undefined;
    }
    toMap(_keyFn, _valueFn) {
        return undefined;
    }
    count() {
        return this.reduce(0, (count) => count + 1);
    }
    consume() {
        let next = this.next();
        while (!next.done) {
            next = this.next();
        }
        return this;
    }
    toArray() {
        return this.reduce([], (array, value) => {
            array.push(value);
            return array;
        });
    }
    join(separator) {
        return this.toArray().join(separator);
    }
    indexOf(value) {
        let next = this.next(), index = 0;
        while (!next.done) {
            if (next.value === value) {
                return index;
            }
            index++;
            next = this.next();
        }
        return -1;
    }
    findIndex(fn) {
        let next = this.nextWithIndex();
        while (!next.done) {
            const [value, index] = next.value;
            if (fn(value, index)) {
                return index;
            }
            next = this.nextWithIndex();
        }
        return -1;
    }
    find(fn) {
        let next = this.nextWithIndex();
        while (!next.done) {
            const [value, index] = next.value;
            if (fn(value, index)) {
                return some(value);
            }
            next = this.nextWithIndex();
        }
        return none();
    }
    findAll(fn) {
        return this.filter(fn);
    }
    nth(index = 0) {
        let next = this.next();
        if (index < 0) {
            index = 0;
        }
        while (!next.done) {
            if (index-- <= 0) {
                return some(next.value);
            }
            next = this.next();
        }
        return none();
    }
    first() {
        return this.nth(0);
    }
    last() {
        let current = this.next();
        while (!current.done) {
            const next = this.next();
            if (next.done) {
                return some(current.value);
            }
            else {
                current = next;
            }
        }
        return none();
    }
    any(fn) {
        return this.findIndex(fn) !== -1;
    }
    some(fn) {
        return this.any(fn);
    }
    none(fn) {
        return this.findIndex(fn) === -1;
    }
    all(fn) {
        let next = this.nextWithIndex();
        while (!next.done) {
            const [value, index] = next.value;
            if (!fn(value, index)) {
                return false;
            }
            next = this.nextWithIndex();
        }
        return true;
    }
    unflatten(_fn) {
        return undefined;
    }
    reduce(acc, fn) {
        let next = this.next();
        while (!next.done) {
            const value = next.value;
            acc = fn(acc, value, this._index - 1);
            next = this.next();
        }
        return acc;
    }
    reverse() {
        return iter(this.toArray().reverse());
    }
}
export function iter(value) {
    if (value != null) {
        if (typeof value[Symbol.iterator] === "function") {
            return new Iter(value[Symbol.iterator]());
        }
        else if (typeof value.next === "function") {
            if (value instanceof Iter) {
                return value;
            }
            else {
                return new Iter(value);
            }
        }
        else if (typeof value === "object") {
            return iter(Object.entries(value));
        }
        else {
            return iter([value]);
        }
    }
    else {
        return iter([]);
    }
}
