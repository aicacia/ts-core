import { Iterator } from "./Iterator";
import { Option, none } from "../option";
import { IIterator } from "./IIterator";

export class Filter<T> extends Iterator<T> {
    private _fn: (value: T) => boolean;

    constructor(iter: IIterator<T>, fn: (value: T) => boolean) {
        super(iter);
        this._fn = fn;
    }

    next(): Option<T> {
        let result = super.next();

        while (result.isSome()) {
            if (this._fn(result.unwarp())) {
                return result;
            }
            result = super.next();
        }

        return none();
    }
}
