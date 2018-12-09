import { IIterator } from "./IIterator";
import { Iterator } from "./Iterator";
import { Option, none, some } from "../option";

export class Map<A, B> extends Iterator<B> {
    private _fn: (value: A) => B;

    constructor(iter: IIterator<A>, fn: (value: A) => B) {
        super((iter as any) as IIterator<B>);
        this._fn = fn;
    }

    next(): Option<B> {
        const result = (super.next() as any) as Option<A>;

        if (result.isSome()) {
            return some(this._fn(result.unwarp()) as B);
        } else {
            return none();
        }
    }
}
