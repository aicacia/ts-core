import * as tape from "tape";
import { range, rangeFrom } from ".";
import { RangeDirection } from "./Range";

tape("range", (assert: tape.Test) => {
  assert.deepEquals(
    range(0, 5)
      .iter()
      .map((x) => x * x)
      .toArray(),
    [0, 1, 4, 9, 16, 25]
  );
  assert.end();
});

tape("range reverse", (assert: tape.Test) => {
  assert.deepEquals(
    range(5, 0)
      .iter()
      .map((x) => x * x)
      .toArray(),
    [25, 16, 9, 4, 1, 0]
  );
  assert.end();
});

tape("range from forward", (assert: tape.Test) => {
  assert.deepEquals(
    rangeFrom(0)
      .iter()
      .map((x) => x * x)
      .take(6)
      .toArray(),
    [0, 1, 4, 9, 16, 25]
  );
  assert.end();
});

tape("range from backward", (assert: tape.Test) => {
  assert.deepEquals(
    rangeFrom(0, RangeDirection.Backward).iter().take(6).toArray(),
    [0, -1, -2, -3, -4, -5]
  );
  assert.end();
});
