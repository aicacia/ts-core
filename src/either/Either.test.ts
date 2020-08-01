import * as tape from "tape";
import { left, Either, right } from ".";
import { some, none } from "../option";

tape("Either", (assert: tape.Test) => {
  assert.equal(left(1).isLeft(), true);
  assert.equal(left(1).isRight(), false);

  assert.equal(right(1).isLeft(), false);
  assert.equal(right(1).isRight(), true);

  assert.equal(left(1).unwrapLeft(), 1);
  assert.equal(right(1).unwrapLeftOr(1), 1);
  assert.equal(
    right(1).unwrapLeftOrElse(() => 1),
    1
  );
  assert.equal(
    left(1)
      .mapLeft((x) => x + 1)
      .unwrapLeft(),
    2
  );
  assert.equal(
    left(1)
      .mapLeftOr((x) => x + 1, 1)
      .unwrapLeft(),
    2
  );
  assert.equal(
    left(1)
      .mapLeftOrElse(
        (x) => x + 1,
        () => 1
      )
      .unwrapLeft(),
    2
  );
  assert.equal(
    right<number, number>(1)
      .mapLeftOr((x) => x + 1, 1)
      .unwrapLeft(),
    1
  );
  assert.equal(
    right<number, number>(1)
      .mapLeft((x) => x + 1)
      .isRight(),
    true
  );

  assert.equal(
    left(1)
      .flatMapLeft((x) => left(x))
      .unwrapLeft(),
    1
  );
  assert.equal(
    right(1)
      .flatMapLeftOr((x) => left(x), left(1))
      .unwrapLeft(),
    1
  );
  assert.equal(
    right(1)
      .flatMapLeftOrElse(
        (x) => left(x),
        () => left(2)
      )
      .unwrapLeft(),
    2
  );

  assert.deepEqual(left(1).leftAnd(left(2)), left(2));
  assert.deepEqual(right(1).leftAnd(left(1)), right(1));

  assert.deepEqual(
    left(1).leftAndThen(() => left(2)),
    left(2)
  );
  assert.deepEqual(
    right(1).leftAndThen(() => left(1)),
    right(1)
  );

  assert.deepEqual(left(1).rightAnd(left(2)), left(1));
  assert.deepEqual(right(1).rightAnd(left(1)), left(1));

  assert.deepEqual(
    left(1).rightAndThen(() => left(2)),
    left(1)
  );
  assert.deepEqual(
    right(1).rightAndThen(() => left(1)),
    left(1)
  );

  assert.deepEqual(left(1).left(), some(1));
  assert.deepEqual(left(1).right(), none());

  assert.deepEqual(right(1).left(), none());
  assert.deepEqual(right(1).right(), some(1));

  assert.deepEqual(right(1).unwrapRight(), 1);

  assert.throws(() => {
    right(1).unwrapLeft();
  }, /Tried to unwrap left value of right Either/);

  assert.throws(() => {
    left(1).unwrapRight();
  }, /Tried to unwrap right value of left Either/);

  assert.throws(
    () => new Either({}, {}, {}),
    /Eithers can only be created with the left or right functions/
  );

  assert.end();
});
