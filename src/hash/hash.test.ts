import * as tape from "tape";
import { integerToBytes } from "./integerToBytes";
import { bytesToInteger } from "./bytesToInteger";
import { defaultHasher } from "./defaultHasher";
import { Hasher } from "./Hasher";
import { IHash } from "./hash";

tape("bytesToInteger/bytesFromInteger", (assert: tape.Test) => {
  [0, 1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096].map((number) => {
    assert.equal(
      bytesToInteger(integerToBytes(new Uint8Array(4), number)),
      number
    );
  });
  assert.end();
});

declare global {
  interface String extends IHash<Hasher> {
    hash<H extends Hasher>(hasher: H): this;
  }
}

String.prototype.hash = function <H extends Hasher>(this: string, hasher: H) {
  for (const char of this) {
    hasher.writeInteger(char.charCodeAt(0));
  }
  return this;
};

tape("hash", (assert: tape.Test) => {
  const hasher = defaultHasher();
  "Hello, world!".hash(hasher);
  assert.equal(hasher.finish(), -867622775);
  assert.end();
});
