import * as tape from "tape";
import { Suite, Event } from "benchmark";
import { iter } from ".";

tape("for of loop", (assert: tape.Test) => {
  new Suite()
    .add("aicacia", () => {
      let acc = 0;
      for (const x of iter([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
        .filter((x) => x % 2 === 0)
        .map((x) => x * x)) {
        acc += x;
      }
      return acc;
    })
    .add("native", () => {
      let acc = 0;
      for (const x of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        .filter((x) => x % 2 === 0)
        .map((x) => x * x)) {
        acc += x;
      }
      return acc;
    })
    .on("cycle", function (this: Suite, event: Event) {
      console.log(String(event.target));
    })
    .on("complete", function () {
      assert.end();
    })
    .run({ async: true });
});
