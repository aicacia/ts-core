const CREATE_SECRET = {}, NONE_SECRET = {};
export class Option {
    constructor(createSecret, value) {
        if (createSecret !== CREATE_SECRET) {
            throw new TypeError("Options can only be created with the some or none functions");
        }
        this._value = value;
    }
    static some(value) {
        return some(value);
    }
    static none() {
        return none();
    }
    static from(value) {
        if (value != null) {
            return some(value);
        }
        else {
            return none();
        }
    }
    isNone() {
        return this._value === NONE_SECRET;
    }
    isSome() {
        return !this.isNone();
    }
    expect(msg) {
        if (this.isSome()) {
            return this._value;
        }
        else {
            throw new Error(typeof msg === "function" ? msg() : msg);
        }
    }
    unwrap() {
        return this.expect("Tried to unwrap value of none Option");
    }
    unwrapOr(def) {
        if (this.isSome()) {
            return this._value;
        }
        else {
            return def;
        }
    }
    unwrapOrElse(defFn) {
        if (this.isSome()) {
            return this._value;
        }
        else {
            return defFn();
        }
    }
    map(fn) {
        if (this.isSome()) {
            return some(fn(this._value));
        }
        else {
            return none();
        }
    }
    mapOr(fn, def) {
        if (this.isSome()) {
            return some(fn(this._value));
        }
        else {
            return some(def);
        }
    }
    mapOrElse(fn, defFn) {
        if (this.isSome()) {
            return some(fn(this._value));
        }
        else {
            return some(defFn());
        }
    }
    flatMap(fn) {
        if (this.isSome()) {
            return fn(this._value);
        }
        else {
            return none();
        }
    }
    flatMapOr(fn, def) {
        if (this.isSome()) {
            return fn(this._value);
        }
        else {
            return def;
        }
    }
    flatMapOrElse(fn, defFn) {
        if (this.isSome()) {
            return fn(this._value);
        }
        else {
            return defFn();
        }
    }
    and(value) {
        if (this.isSome()) {
            return value;
        }
        else {
            return none();
        }
    }
    andThen(fn) {
        if (this.isSome()) {
            return fn(this._value);
        }
        else {
            return none();
        }
    }
    or(value) {
        if (this.isNone()) {
            return value;
        }
        else {
            return this;
        }
    }
    orElse(fn) {
        if (this.isNone()) {
            return fn();
        }
        else {
            return this;
        }
    }
    xor(value) {
        const a = this.isSome(), b = value.isSome();
        if (a && !b) {
            return this;
        }
        else if (!a && b) {
            return value;
        }
        else {
            return none();
        }
    }
    filter(fn) {
        if (this.isSome() && fn(this._value)) {
            return this;
        }
        else {
            return none();
        }
    }
    getOrInsert(value) {
        if (this.isNone()) {
            this._value = value;
        }
        return this;
    }
    getOrInsertWith(fn) {
        if (this.isNone()) {
            this._value = fn();
        }
        return this;
    }
    take() {
        if (this.isSome()) {
            const value = this._value;
            this._value = NONE_SECRET;
            return some(value);
        }
        else {
            return none();
        }
    }
    from(value) {
        if (value != null) {
            this._value = value;
        }
        else {
            this.clear();
        }
        return this;
    }
    replace(value) {
        this._value = value;
        return this;
    }
    clear() {
        this._value = NONE_SECRET;
        return this;
    }
    okOr(error) {
        if (this.isSome()) {
            return ok(this._value);
        }
        else {
            return err(error);
        }
    }
    okOrElse(errorFn) {
        if (this.isSome()) {
            return ok(this._value);
        }
        else {
            return err(errorFn());
        }
    }
    ifSome(fn, elseFn) {
        if (this.isSome()) {
            fn(this._value);
        }
        else if (elseFn) {
            elseFn();
        }
        return this;
    }
    ifNone(fn, elseFn) {
        if (this.isNone()) {
            fn();
        }
        else if (elseFn) {
            elseFn(this._value);
        }
        return this;
    }
    fromJSON(json) {
        return Option.from(json);
    }
    toJSON() {
        return this.map(toJSON).unwrapOr(null);
    }
    toJS() {
        return this.map(toJS).unwrapOr(null);
    }
}
export const some = (value) => new Option(CREATE_SECRET, value);
export const none = () => new Option(CREATE_SECRET, NONE_SECRET);
import { err, ok } from "../result";
import { toJS } from "../toJS";
import { toJSON } from "../toJSON";
