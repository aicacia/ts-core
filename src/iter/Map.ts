import { Option } from "../option";
import { IIterator } from "./IIterator";
import { Iterator } from "./Iterator";

export type IMapFn<A, B> = (value: A, index: number) => B;

export class Map<A, B> extends Iterator<B> {
  private _fn: IMapFn<A, B>;

  constructor(iter: IIterator<A>, fn: IMapFn<A, B>) {
    super((iter as any) as IIterator<B>);
    this._fn = fn;
  }

  next(): Option<B> {
    return ((super.nextWithIndex() as any) as Option<
      [A, number]
    >).map(([value, index]) => this._fn(value, index));
  }
}
