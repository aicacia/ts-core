import { Iter } from "./Iter";
export class Unflatten extends Iter {
    constructor(iter, fn) {
        super(iter);
        this._fn = fn;
    }
    next() {
        return this._fn(this._iter);
    }
}
Iter.prototype.unflatten = function unflatten(fn) {
    return new Unflatten(this, fn);
};
