import { defaultHasher } from "./defaultHasher";
const ALREADY_HASHED_SET = new Set();
export function hashOf(value, getHasher = defaultHasher) {
    return hash(value, getHasher()).finish();
}
export function hash(value, hasher) {
    hashInternal(value, hasher);
    ALREADY_HASHED_SET.clear();
    return hasher;
}
function hashInternal(value, hasher) {
    if (value != null && !ALREADY_HASHED_SET.has(value)) {
        ALREADY_HASHED_SET.add(value);
        if (typeof value === "string") {
            hashString(value, hasher);
        }
        else if (typeof value === "number") {
            hashNumber(value, hasher);
        }
        else if (typeof value === "boolean") {
            hashBoolean(value, hasher);
        }
        else if (typeof value === "symbol") {
            hashSymbol(value, hasher);
        }
        else if (typeof value[Symbol.iterator] === "function") {
            hashIterable(value, hasher);
        }
        else if (typeof value.length === "number") {
            hashArray(value, hasher);
        }
        else {
            hashObject(value, hasher);
        }
    }
    return hasher;
}
function hashString(value, hasher) {
    for (const char of value) {
        hasher.writeInteger(char.charCodeAt(0));
    }
}
function hashNumber(value, hasher) {
    hasher.writeInteger(value);
}
function hashBoolean(value, hasher) {
    hasher.writeInteger(value === true ? 1 : 0);
}
function hashSymbol(value, hasher) {
    hashString(value.toString(), hasher);
}
function hashIterable(iterable, hasher) {
    for (const value of iterable) {
        hashInternal(value, hasher);
    }
}
function hashArray(array, hasher) {
    for (let i = 0, il = array.length; i < il; i++) {
        hashInternal(array[i], hasher);
    }
}
function hashObject(value, hasher) {
    for (const key in value) {
        if (value.hasOwnProperty(key)) {
            hashString(key, hasher);
            hashInternal(value[key], hasher);
        }
    }
}
