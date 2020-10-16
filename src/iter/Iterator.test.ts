import * as tape from "tape";
import { iter } from "./iter";

tape("simple skip", (assert: tape.Test) => {
  assert.deepEqual(iter([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).step(2).toArray(), [
    2,
    5,
    8,
  ]);
  assert.end();
});

tape("simple iter", (assert: tape.Test) => {
  const result = iter([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    .skip(1)
    .step(2)
    .map((i) => i ** 2)
    .filter((i) => i % 2 === 0)
    .toMap(
      (i) => i,
      (i) => i * 2
    )
    .toObject();

  assert.deepEqual(result, { 16: 32, 100: 200 });

  assert.end();
});

tape("simple object iter", (assert: tape.Test) => {
  const result = iter({ a: 0, b: 1, c: 2 })
    .map(([k, v]) => [v, k])
    .toMap(
      ([k, _v]) => k,
      ([_k, v]) => v
    )
    .toObject();

  assert.deepEqual(result, { 0: "a", 1: "b", 2: "c" });

  assert.end();
});

tape("simple Iterable iter", (assert: tape.Test) => {
  assert.deepEqual(iter(new Set([0, 1, 2, 3])).toArray(), [0, 1, 2, 3]);
  assert.deepEqual(
    iter(
      new Map([
        [0, 0],
        [1, 1],
      ])
    ).toArray(),
    [
      [0, 0],
      [1, 1],
    ]
  );
  assert.deepEqual(iter(iter([0, 1, 2, 3])).toArray(), [0, 1, 2, 3]);
  assert.end();
});

tape("native for of iter", (assert: tape.Test) => {
  const results: number[] = [];

  for (const value of iter([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).filter(
    (x) => x % 2 === 0
  )) {
    results.push(value);
  }

  assert.deepEqual(results, [0, 2, 4, 6, 8, 10]);
  assert.end();
});

tape("find", (assert: tape.Test) => {
  assert.equal(
    iter([1, 2])
      .find((i) => i % 2 === 0)
      .unwrap(),
    2
  );
  assert.true(
    iter([1, 2])
      .find((i) => i > 3)
      .isNone()
  );
  assert.end();
});

tape("findAll", (assert: tape.Test) => {
  assert.deepEqual(
    iter([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
      .findAll((i) => i % 2 === 0)
      .toArray(),
    [0, 2, 4, 6, 8]
  );
  assert.end();
});

tape("nth", (assert: tape.Test) => {
  const result = iter([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    .map((i) => i ** 2)
    .filter((i) => i % 2 === 0)
    .nth(4)
    .unwrap();

  assert.equal(result, 64);
  assert.end();
});

tape("first", (assert: tape.Test) => {
  assert.equal(iter([0, 1, 2]).first().unwrap(), 0);
  assert.end();
});

tape("last", (assert: tape.Test) => {
  assert.equal(iter([0, 1, 2]).last().unwrap(), 2);
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

tape("forEach", (assert: tape.Test) => {
  let count = 0;

  iter([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    .forEach(() => {
      count++;
    })
    .toArray();

  assert.deepEqual(count, 10);
  assert.end();
});

tape("types", (assert: tape.Test) => {
  const result = iter([{ key: "value" }, { key: 10 }])
    .map((obj) => obj.key)
    .filter((key) => typeof key === "string")
    .toArray();

  assert.deepEqual(result, ["value"]);
  assert.end();
});

tape("concat", (assert: tape.Test) => {
  const result = iter([0, 1, 2])
    .concat(iter([3, 4, 5]))
    .toArray();

  assert.deepEqual(result, [0, 1, 2, 3, 4, 5]);
  assert.end();
});

tape("consume", (assert: tape.Test) => {
  const array: number[] = [];

  iter([0, 1, 2])
    .forEach((value) => {
      array.push(value);
    })
    .consume();

  assert.deepEqual(array, [0, 1, 2]);
  assert.end();
});

tape("unflatten", (assert: tape.Test) => {
  const array = iter([0, 0, 1, 1, 2, 2])
    .unflatten((iter) =>
      iter.next().flatMap((a) => iter.next().map((b) => [a, b]))
    )
    .toArray();

  assert.deepEqual(array, [
    [0, 0],
    [1, 1],
    [2, 2],
  ]);
  assert.end();
});
