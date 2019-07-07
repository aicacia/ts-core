import * as tape from "tape";
import { isString } from "util";
import { iter } from "../lib";

tape("simple skip", (assert: tape.Test) => {
  assert.deepEqual(
    iter([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
      .step(2)
      .toArray(),
    [2, 5, 8]
  );
  assert.end();
});

tape("simple iter", (assert: tape.Test) => {
  const result = iter([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    .skip(1)
    .step(2)
    .map(i => i ** 2)
    .filter(i => i % 2 === 0)
    .toMap(i => i, i => i * 2)
    .toObject();

  assert.deepEqual(result, { 16: 32, 100: 200 });

  assert.end();
});

tape("simple object iter", (assert: tape.Test) => {
  const result = iter({ a: 0, b: 1, c: 2 })
    .map(([k, v]) => [v, k])
    .toMap(([k, v]) => k, ([k, v]) => v)
    .toObject();

  assert.deepEqual(result, { 0: "a", 1: "b", 2: "c" });

  assert.end();
});

tape("native for of iter", (assert: tape.Test) => {
  const results: number[] = [];

  for (const value of iter([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).filter(
    x => x % 2 === 0
  )) {
    results.push(value);
  }

  assert.deepEqual(results, [0, 2, 4, 6, 8, 10]);
  assert.end();
});

tape("nth", (assert: tape.Test) => {
  const result = iter([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    .map(i => i ** 2)
    .filter(i => i % 2 === 0)
    .nth(4)
    .unwrap();

  assert.equal(result, 64);
  assert.end();
});

tape("index", (assert: tape.Test) => {
  const result = iter([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    .map((x, index) => index ** 2)
    .filter((x, index) => index % 2 === 0)
    .map((x, index) => index)
    .toArray();

  assert.deepEqual(result, [0, 1, 2, 3, 4]);
  assert.end();
});

tape("types", (assert: tape.Test) => {
  const result = iter([{ key: "value" }, { key: 10 }])
    .map(obj => obj.key)
    .filter(isString)
    .toArray();

  assert.deepEqual(result, ["value"]);
  assert.end();
});
