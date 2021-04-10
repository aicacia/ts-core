import * as tape from "tape";
import { Suite, Event } from "benchmark";
import { range } from "../range";

function addAicaciaBench(suite: Suite, size: number) {
  const iter = range(0, size).iter();

  suite.add(`Aicacia: Array(${size})`, () => {
    let acc = 0;
    for (const x of iter.filter((x) => x % 2 === 0).map((x) => x * x)) {
      acc += x;
    }
    return acc;
  });
}

function addNativeBench(suite: Suite, size: number) {
  const array = range(0, size).iter().toArray();
  suite.add(`Native: Array(${size})`, () => {
    let acc = 0;
    for (const x of array.filter((x) => x % 2 === 0).map((x) => x * x)) {
      acc += x;
    }
    return acc;
  });
}

tape("for of loop", (assert: tape.Test) => {
  const suite = new Suite()
    .on("cycle", function (this: Suite, event: Event) {
      console.log(String(event.target));
    })
    .on("complete", () => assert.end());

  for (let i = 1; i <= 4; i++) {
    addAicaciaBench(suite, 1024 * i * i * i);
    addNativeBench(suite, 1024 * i * i * i);
  }

  suite.run({ async: false });
});
