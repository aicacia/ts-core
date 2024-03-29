import * as tape from "tape";
import { Map } from "immutable";
import { err, ok, Result } from ".";
import { none, some } from "../option";

const ERROR = new Error("test error");

tape("Result", (assert: tape.Test) => {
  assert.equal(ok(1).isOk(), true);
  assert.equal(ok(1).isErr(), false);

  assert.equal(err(ERROR).isOk(), false);
  assert.equal(err(ERROR).isErr(), true);

  assert.equal(ok(1).unwrap(), 1);
  assert.equal(err(ERROR).unwrapOr(1), 1);
  assert.equal(
    err(ERROR).unwrapOrElse(() => 1),
    1
  );
  assert.equal(
    ok(1)
      .map((x) => x + 1)
      .unwrap(),
    2
  );
  assert.equal(
    ok(1)
      .mapOr((x) => x + 1, 1)
      .unwrap(),
    2
  );
  assert.equal(
    ok(1)
      .mapOrElse(
        (x) => x + 1,
        () => 1
      )
      .unwrap(),
    2
  );
  assert.equal(
    err<number, Error>(ERROR)
      .mapOr((x) => x + 1, 1)
      .unwrap(),
    1
  );
  assert.equal(
    err<number, Error>(ERROR)
      .map((x) => x + 1)
      .isErr(),
    true
  );

  assert.equal(
    ok(1)
      .flatMap((x) => ok(x))
      .unwrap(),
    1
  );
  assert.equal(
    err(ERROR)
      .flatMapOr((x) => ok(x), ok(1))
      .unwrap(),
    1
  );
  assert.equal(
    err(ERROR)
      .flatMapOrElse(
        (x) => ok(x),
        () => ok(2)
      )
      .unwrap(),
    2
  );

  assert.deepEqual(ok(1).and(ok(2)), ok(2));
  assert.deepEqual(err(ERROR).and(ok(1)), err(ERROR));

  assert.deepEqual(
    ok(1).andThen(() => ok(2)),
    ok(2)
  );
  assert.deepEqual(
    err(ERROR).andThen(() => ok(1)),
    err(ERROR)
  );

  assert.deepEqual(ok(1).or(ok(2)), ok(1));
  assert.deepEqual(err(ERROR).or(ok(1)), ok(1));

  assert.deepEqual(
    ok(1).orElse(() => ok(2)),
    ok(1)
  );
  assert.deepEqual(
    err(ERROR).orElse(() => ok(1)),
    ok(1)
  );

  assert.deepEqual(Result.fromOption(some(1)), ok(1));
  assert.deepEqual(
    Result.fromOption(none()),
    err(new Error("Tried to create Result from none Option"))
  );

  assert.deepEqual(err(ERROR).unwrapErr(), ERROR);

  assert.deepEqual(ok(Map()).toJS(), { ok: {} });
  assert.deepEqual(ok(Map()).toJSON(), { ok: {} });

  assert.deepEqual(err(ERROR).toJS(), { err: ERROR });
  assert.deepEqual(err(ERROR).toJSON(), { err: ERROR });

  assert.throws(() => {
    err(ERROR).unwrap();
  }, new RegExp(ERROR.message));

  assert.throws(() => {
    ok(1).unwrapErr();
  }, /Tried to unwrap error value of ok Result/);

  assert.throws(
    () => new Result({}, {}, {}),
    /Results can only be created with the ok or err functions/
  );

  assert.end();
});
