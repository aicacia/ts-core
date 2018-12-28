import * as tape from "tape";
import { Option, some, none, ok, err } from "../lib";

tape("Option", (assert: tape.Test) => {
  assert.equal(some(1).isSome(), true);
  assert.equal(some(1).isNone(), false);

  assert.equal(none().isSome(), false);
  assert.equal(none().isNone(), true);

  assert.equal(some(1).unwrap(), 1);
  assert.equal(
    some(1)
      .map(x => x + 1)
      .unwrap(),
    2
  );
  assert.equal(
    some(1)
      .mapOr(1, x => x + 1)
      .unwrap(),
    2
  );
  assert.equal(
    none<number>()
      .mapOr(1, x => x + 1)
      .unwrap(),
    1
  );
  assert.equal(
    none<number>()
      .map(x => x + 1)
      .isNone(),
    true
  );

  assert.deepEqual(some(1).okOr("Error"), ok(1));
  assert.deepEqual(none().okOr("Error"), err("Error"));

  assert.deepEqual(some(1).okOrElse(() => "Error"), ok(1));
  assert.deepEqual(none().okOrElse(() => "Error"), err("Error"));

  assert.deepEqual(some(1).and(some(2)), some(2));
  assert.deepEqual(none().and(some(1)), none());

  assert.deepEqual(some(1).andThen(() => some(2)), some(2));
  assert.deepEqual(none().andThen(() => some(1)), none());

  assert.deepEqual(some(1).or(some(2)), some(1));
  assert.deepEqual(none().or(some(1)), some(1));

  assert.deepEqual(some(1).orElse(() => some(2)), some(1));
  assert.deepEqual(none().orElse(() => some(1)), some(1));

  assert.deepEqual(some(1).xor(some(2)), none());
  assert.deepEqual(none().xor(some(2)), some(2));
  assert.deepEqual(some(1).xor(none()), some(1));

  assert.deepEqual(some(1).filter(x => x === 1), some(1));
  assert.deepEqual(some(2).filter(x => x === 1), none());
  assert.deepEqual(none().filter(() => true), none());

  assert.deepEqual(some(2).getOrInsert(1), some(2));
  assert.deepEqual(none().getOrInsert(1), some(1));
  assert.deepEqual(some(2).getOrInsertWith(() => 1), some(2));
  assert.deepEqual(none().getOrInsertWith(() => 1), some(1));

  assert.deepEqual(some(0).replace(1), some(1));
  assert.deepEqual(none().replace(1), some(1));

  assert.throws(() => {
    none().unwrap();
  }, "Tried to unwrap value of none Option");

  assert.throws(() => {
    new Option({}, {});
  }, "Options can only be created with the some or none functions");

  assert.end();
});
