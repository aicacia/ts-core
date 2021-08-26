import { Iter } from "./Iter";
export class Enumerate extends Iter {
    constructor(iter) {
        super(iter);
    }
    next() {
        const next = super.nextWithIndex();
        if (next.done) {
            return next;
        }
        else {
            return { value: swap(next.value) };
        }
    }
}
Iter.prototype.enumerate = function enumerate() {
    return new Enumerate(this);
};
function swap(array) {
    const tmp = array[0], newArray = array;
    newArray[0] = array[1];
    newArray[1] = tmp;
    return newArray;
}
