import { Option } from "../option";
import { IIterator } from "./IIterator";
import { Iterator } from "./Iterator";

export class Enumerate<T> extends Iterator<[number, T]> {
  constructor(iter: IIterator<T>) {
    super(iter as any);
  }

  next(): Option<[number, T]> {
    return ((super.nextWithIndex() as any) as Option<[T, number]>).map(swap);
  }
}

function swap<A, B>(array: [A, B]): [B, A] {
  const tmp = array[0],
    newArray: [B, A] = array as any;
  newArray[0] = array[1];
  newArray[1] = tmp;
  return newArray;
}
