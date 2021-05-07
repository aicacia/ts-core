import { Iter } from "./Iter";
export const defaultKeyFn = (key) => key;
export const defaultValueFn = (value) => value;
export class ToMap extends Iter {
    constructor(iter, keyFn, valueFn) {
        super(iter);
        this._map = ([value, index]) => [keyFn(value, index), valueFn(value, index)];
    }
    toObject() {
        return this.reduce({}, (object, value) => {
            object[value[0]] = value[1];
            return object;
        });
    }
    next() {
        const next = super.nextWithIndex();
        if (next.done) {
            return next;
        }
        else {
            return { done: false, value: this._map(next.value) };
        }
    }
}
