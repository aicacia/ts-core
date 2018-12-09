import { IIterator } from "./IIterator";
import { Iterator } from "./Iterator";
import { Option } from "../option";

export class ForEach<T> extends Iterator<T> {
    private _fn: (value: T) => void;

    constructor(iter: IIterator<T>, fn: (value: T) => void) {
        super(iter);
        this._fn = fn;
    }

    next(): Option<T> {
        const result = super.next();

        if (result.isSome()) {
            this._fn(result.unwarp());
        }

        return result;
    }
}
