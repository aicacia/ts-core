import { Iter } from "./Iter";
export class Skip extends Iter {
    constructor(iter, skip) {
        super(iter);
        this._skipped = 0;
        this._skip = (skip <= 0 ? 0 : skip) | 0;
    }
    next() {
        let result = super.next();
        while (!result.done) {
            if (this._skipped <= this._skip) {
                this._skipped += 1;
                result = super.next();
            }
            else {
                return result;
            }
        }
        return { done: true, value: undefined };
    }
}
