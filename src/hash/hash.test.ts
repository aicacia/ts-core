import * as tape from "tape";
import { integerToBytes, bytesToInteger, defaultHasher } from ".";
import { hash } from ".";

tape("bytesToInteger/bytesFromInteger", (assert: tape.Test) => {
  [0, 1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096].map((number) => {
    assert.equal(
      bytesToInteger(integerToBytes(new Uint8Array(4), number)),
      number
    );
  });
  assert.end();
});

function hashValue(value: any): number {
  const hasher = defaultHasher();
  hash(value, hasher);
  return hasher.finish();
}

tape("hash it all", (assert: tape.Test) => {
  const string = "Hello, world!",
    number = 10,
    boolean = true,
    array = [boolean, 1],
    object = { key: "value" },
    symbol = Symbol("symbol");
  const all = { string, number, array, object, symbol };
  assert.equal(hashValue(boolean), 1);
  assert.equal(hashValue(string), -867622775);
  assert.equal(hashValue(number), 10);
  assert.equal(hashValue(array), 923522);
  assert.equal(hashValue(object), -515809763);
  assert.equal(hashValue(symbol), -617543331);
  assert.equal(hashValue(all), -635759217);
  assert.end();
});
