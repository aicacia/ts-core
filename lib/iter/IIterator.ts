import { Option } from "../option";

export interface IIterator<T> {
  next(): Option<T>;
}
