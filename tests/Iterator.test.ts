import * as tape from "tape";
import "../lib";

tape("simple skip", (assert: tape.Test) => {
    assert.deepEqual(
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            .iter()
            .step(2)
            .toArray(),
        [2, 5, 8]
    );
    assert.end();
});

tape("simple iter", (assert: tape.Test) => {
    const result = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        .iter()
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
    const result = { a: 0, b: 1, c: 2 }
        .iter()
        .map(([k, v]) => [v, k])
        .toMap(([k, v]) => k, ([k, v]) => v)
        .toObject();

    assert.deepEqual(result, { 0: "a", 1: "b", 2: "c" });

    assert.end();
});
