import { Hasher } from "./Hasher";

export function hash(value: any, hasher: Hasher) {
  if (value != null) {
    if (typeof value === "string") {
      hashString(value, hasher);
    } else if (typeof value === "number") {
      hashNumber(value, hasher);
    } else if (typeof value === "boolean") {
      hashBoolean(value, hasher);
    } else if (typeof value === "symbol") {
      hashSymbol(value, hasher);
    } else if (typeof value[Symbol.iterator] === "function") {
      hashIterable(value, hasher);
    } else if (typeof value.length === "number") {
      hashArray(value, hasher);
    } else {
      hashObject(value, hasher);
    }
  }
}

function hashString(value: string, hasher: Hasher) {
  for (const char of value) {
    hasher.writeInteger(char.charCodeAt(0));
  }
}

function hashNumber(value: number, hasher: Hasher) {
  hasher.writeInteger(value);
}

function hashBoolean(value: boolean, hasher: Hasher) {
  hasher.writeInteger(value === true ? 1 : 0);
}

function hashSymbol(value: symbol, hasher: Hasher) {
  hashString(value.toString(), hasher);
}

function hashIterable(iterable: Iterable<any>, hasher: Hasher) {
  for (const value of iterable) {
    hash(value, hasher);
  }
}

function hashArray(array: Array<any>, hasher: Hasher) {
  for (let i = 0, il = array.length; i < il; i++) {
    hash(array[i], hasher);
  }
}

function hashObject(value: any, hasher: Hasher) {
  for (const key in value) {
    if (value.hasOwnProperty(key)) {
      hashString(key, hasher);
      hash(value[key], hasher);
    }
  }
}
