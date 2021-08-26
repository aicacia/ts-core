import { Iter } from "./Iter";
export class Take extends Iter {
    constructor(iter, count) {
        super(iter);
        this._taken = 0;
        this._count = (count <= 0 ? 0 : count) | 0;
    }
    next() {
        if (this._taken < this._count) {
            this._taken += 1;
            return super.next();
        }
        else {
            return { done: true, value: undefined };
        }
    }
}
Iter.prototype.take = function take(count) {
    return new Take(this, count);
};
