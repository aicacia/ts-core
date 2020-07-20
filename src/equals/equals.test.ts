import * as tape from "tape";
import { equals, IEquals, safeEquals } from "./equals";

class Test<T> implements IEquals<Test<T>> {
  value: T;

  constructor(value: T) {
    this.value = value;
  }

  equals(other: Test<T>): boolean {
    return this.value === other.value;
  }
}

tape("equals", (assert: tape.Test) => {
  assert.true(equals(new Test(10), new Test(10)));
  assert.false(equals(new Test(10), new Test(5)));
  assert.end();
});

tape("safeEquals", (assert: tape.Test) => {
  assert.true(safeEquals(10, 10));
  assert.false(safeEquals(10, 5));
  assert.true(safeEquals(new Test(10), new Test(10)));
  assert.false(safeEquals(new Test(10), new Test(5)));
  assert.end();
});
