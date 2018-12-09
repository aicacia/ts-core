import * as tape from "tape";
import { Result, ok, err, none, some } from "../lib";

const ERROR = new Error("test error");

tape("Result", (assert: tape.Test) => {
    assert.equal(ok(1).isOk(), true);
    assert.equal(ok(1).isErr(), false);

    assert.equal(err(ERROR).isOk(), false);
    assert.equal(err(ERROR).isErr(), true);

    assert.equal(ok(1).unwarp(), 1);
    assert.equal(
        ok(1)
            .map(x => x + 1)
            .unwarp(),
        2
    );
    assert.equal(
        ok(1)
            .mapOr(1, x => x + 1)
            .unwarp(),
        2
    );
    assert.equal(
        err<number, Error>(ERROR)
            .mapOr(1, x => x + 1)
            .unwarp(),
        1
    );
    assert.equal(
        err<number, Error>(ERROR)
            .map(x => x + 1)
            .isErr(),
        true
    );

    assert.deepEqual(ok(1).and(ok(2)), ok(2));
    assert.deepEqual(err(ERROR).and(ok(1)), err(ERROR));

    assert.deepEqual(ok(1).andThen(() => ok(2)), ok(2));
    assert.deepEqual(err(ERROR).andThen(() => ok(1)), err(ERROR));

    assert.deepEqual(ok(1).or(ok(2)), ok(1));
    assert.deepEqual(err(ERROR).or(ok(1)), ok(1));

    assert.deepEqual(ok(1).orElse(() => ok(2)), ok(1));
    assert.deepEqual(err(ERROR).orElse(() => ok(1)), ok(1));

    assert.deepEqual(ok(1).ok(), some(1));
    assert.deepEqual(ok(1).err(), none());

    assert.deepEqual(err(ERROR).ok(), none());
    assert.deepEqual(err(ERROR).err(), some(ERROR));

    assert.throws(() => {
        err(ERROR).unwarp();
    }, "Tried to get value of err Result");

    assert.throws(() => {
        new Result({});
    }, "Results can only be created with the ok or err functions");

    assert.end();
});
