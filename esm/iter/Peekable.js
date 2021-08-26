import { some, none } from "../option";
import { Iter } from "./Iter";
export class Peekable extends Iter {
    constructor() {
        super(...arguments);
        this.peeked = [];
    }
    unpeekAll() {
        this.peeked.length = 0;
        return this;
    }
    unpeek() {
        if (this.peeked.length > 0) {
            return some(this.peeked.shift());
        }
        else {
            return none();
        }
    }
    peek(offset = 0) {
        if (offset < this.peeked.length) {
            return some(this.peeked[offset]);
        }
        else {
            let index = this.peeked.length - offset - 1, next = super.next();
            while (!next.done) {
                this.peeked.push(next.value);
                if (--index <= 0) {
                    break;
                }
                else {
                    next = super.next();
                }
            }
            if (next.done) {
                return none();
            }
            else {
                return some(next.value);
            }
        }
    }
    next() {
        const peeked = this.unpeek();
        if (peeked.isSome()) {
            return { done: false, value: peeked.unwrap() };
        }
        const next = super.next();
        if (next.done) {
            return next;
        }
        else {
            return { done: false, value: next.value };
        }
    }
}
Iter.prototype.peekable = function peekable() {
    return new Peekable(this);
};
