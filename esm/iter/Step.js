import { Iter } from "./Iter";
export class Step extends Iter {
    constructor(iter, step) {
        super(iter);
        this._stepped = 0;
        this._step = step <= 0 ? 1 : step | 0;
    }
    next() {
        let result = super.next();
        while (!result.done) {
            if (this._stepped < this._step) {
                this._stepped += 1;
                result = super.next();
            }
            else {
                this._stepped = 0;
                return result;
            }
        }
        return { done: true, value: undefined };
    }
}
Iter.prototype.step = function step(step) {
    return new Step(this, step);
};
