import { Option } from "../option";

export const iterator = Symbol("Iterator");

export interface IIterator<T> {
  next(): Option<T>;
}

export interface IIterableIterator<T> extends IIterator<T> {
  [iterator](): IIterator<T>;
}
