import { Hasher } from "./Hasher";

export interface IHash {
  hash<H extends Hasher>(hasher: H): this;
}

export function hash<H extends Hasher, T extends IHash = IHash>(
  value: T,
  hasher: H
) {
  return value.hash(hasher);
}

export function safeHash<H extends Hasher>(value: any, hasher: H) {
  if (value != null && typeof value.hash === "function") {
    return value.hash(hasher);
  } else {
    return value;
  }
}

declare global {
  interface String extends IHash {
    hash<H extends Hasher>(hasher: H): this;
  }
  interface Number extends IHash {
    hash<H extends Hasher>(hasher: H): this;
  }
  interface Boolean extends IHash {
    hash<H extends Hasher>(hasher: H): this;
  }
  interface Symbol extends IHash {
    hash<H extends Hasher>(hasher: H): this;
  }
  interface Array<T> extends IHash {
    hash<H extends Hasher>(hasher: H): this;
  }
  interface Object extends IHash {
    hash<H extends Hasher>(hasher: H): this;
  }
}

String.prototype.hash = function hash<H extends Hasher>(
  this: string,
  hasher: H
) {
  for (const char of this) {
    hasher.writeInteger(char.charCodeAt(0));
  }
  return this;
};

Number.prototype.hash = function hash<H extends Hasher>(
  this: number,
  hasher: H
) {
  hasher.writeInteger(this);
  return this;
};

Boolean.prototype.hash = function hash<H extends Hasher>(
  this: boolean,
  hasher: H
) {
  hasher.writeInteger(this === true ? 1 : 0);
  return this;
};

Symbol.prototype.hash = function hash<H extends Hasher>(hasher: H) {
  this.toString().hash(hasher);
  return this;
};

Array.prototype.hash = function hash<H extends Hasher>(hasher: H) {
  for (const value of this) {
    safeHash(value, hasher);
  }
  return this;
};

Object.prototype.hash = function hash<H extends Hasher>(hasher: H) {
  const object = this as any;
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      safeHash(object[key], hasher);
    }
  }
  return this;
};
