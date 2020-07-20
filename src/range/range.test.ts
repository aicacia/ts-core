import * as tape from "tape";
import { range, rangeFrom } from ".";

tape("range", (assert: tape.Test) => {
  assert.deepEquals(
    range(0, 5)
      .iter()
      .map(x => x * x)
      .toArray(),
    [0, 1, 4, 9, 16, 25]
  );
  assert.end();
});

tape("range reverse", (assert: tape.Test) => {
  assert.deepEquals(
    range(5, 0)
      .iter()
      .map(x => x * x)
      .toArray(),
    [25, 16, 9, 4, 1, 0]
  );
  assert.end();
});

tape("range from", (assert: tape.Test) => {
  assert.deepEquals(
    rangeFrom(0)
      .iter()
      .map(x => x * x)
      .take(6)
      .toArray(),
    [0, 1, 4, 9, 16, 25]
  );
  assert.end();
});
