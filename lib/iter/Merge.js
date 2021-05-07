import { Iter } from "./Iter";
export class Merge extends Iter {
    constructor(iter, other) {
        super(iter);
        this._other = other;
    }
    next() {
        const next = super.next();
        if (next.done) {
            return this._other.next();
        }
        else {
            return next;
        }
    }
}
