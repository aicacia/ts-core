import * as tape from "tape";
import { safeClone, IClone } from ".";

class Person implements IClone {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  clone() {
    return new Person(this.name);
  }
}

tape("clone", (assert: tape.Test) => {
  const nathan = new Person("nathan");
  assert.deepEqual(safeClone(nathan), nathan);
  assert.deepEqual(safeClone({}), {});
  assert.end();
});
