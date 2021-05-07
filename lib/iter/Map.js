import { Iter } from "./Iter";
export class Map extends Iter {
    constructor(iter, fn) {
        super(iter);
        this._fn = ([value, index]) => fn(value, index);
    }
    next() {
        const next = super.nextWithIndex();
        if (next.done) {
            return next;
        }
        else {
            return { done: false, value: this._fn(next.value) };
        }
    }
}
