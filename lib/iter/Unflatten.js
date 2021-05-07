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
