import { Option } from "../option";
import { IIterator } from "./IIterator";
import { Iterator } from "./Iterator";

export class Enumerate<T> extends Iterator<[T, number]> {
  constructor(iter: IIterator<T>) {
    super(iter as any);
  }

  next(): Option<[T, number]> {
    return super.nextWithIndex() as any;
  }
}
