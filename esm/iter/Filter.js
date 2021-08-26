import { Iter } from "./Iter";
export class Filter extends Iter {
    constructor(iter, fn) {
        super(iter);
        this._fn = fn;
    }
    next() {
        let result = super.nextWithIndex();
        while (!result.done) {
            const [value, index] = result.value;
            if (this._fn(value, index)) {
                return { done: false, value };
            }
            result = super.nextWithIndex();
        }
        return { done: true, value: undefined };
    }
}
Iter.prototype.filter = function filter(fn) {
    return new Filter(this, fn);
};
