import { toJS } from "../toJS";
import { toJSON } from "../toJSON";
const CREATE_SECRET = {}, NULL_SECRET = {};
export class Result {
    constructor(createSecret, ok, err) {
        if (createSecret !== CREATE_SECRET) {
            throw new TypeError("Results can only be created with the ok or err functions");
        }
        this._ok = ok;
        this._err = err;
    }
    static ok(value) {
        return ok(value);
    }
    static err(error) {
        return err(error);
    }
    static fromOption(option, msg = "Tried to create Result from none Option") {
        if (option.isSome()) {
            return ok(option.unwrap());
        }
        else {
            return err(new Error(msg));
        }
    }
    isErr() {
        return this._err !== NULL_SECRET;
    }
    isOk() {
        return this._ok !== NULL_SECRET;
    }
    expect() {
        if (this.isOk()) {
            return this._ok;
        }
        else {
            throw this._err;
        }
    }
    unwrap() {
        return this.expect();
    }
    unwrapOr(def) {
        if (this.isOk()) {
            return this._ok;
        }
        else {
            return def;
        }
    }
    unwrapOrElse(defFn) {
        if (this.isOk()) {
            return this._ok;
        }
        else {
            return defFn(this._err);
        }
    }
    map(fn) {
        if (this.isOk()) {
            return ok(fn(this._ok));
        }
        else {
            return err(this._err);
        }
    }
    mapOr(fn, def) {
        if (this.isOk()) {
            return ok(fn(this._ok));
        }
        else {
            return ok(def);
        }
    }
    mapOrElse(fn, defFn) {
        if (this.isOk()) {
            return ok(fn(this._ok));
        }
        else {
            return ok(defFn(this._err));
        }
    }
    flatMap(fn) {
        if (this.isOk()) {
            return fn(this._ok);
        }
        else {
            return err(this._err);
        }
    }
    flatMapOr(fn, def) {
        if (this.isOk()) {
            return fn(this._ok);
        }
        else {
            return def;
        }
    }
    flatMapOrElse(fn, defFn) {
        if (this.isOk()) {
            return fn(this._ok);
        }
        else {
            return defFn(this._err);
        }
    }
    expectErr(msg) {
        if (this.isErr()) {
            return this._err;
        }
        else {
            throw new Error(typeof msg === "function" ? msg() : msg);
        }
    }
    unwrapErr() {
        return this.expectErr("Tried to unwrap error value of ok Result");
    }
    unwrapErrOr(def) {
        if (this.isErr()) {
            return this._err;
        }
        else {
            return def;
        }
    }
    unwrapErrOrElse(defFn) {
        if (this.isErr()) {
            return this._err;
        }
        else {
            return defFn(this._ok);
        }
    }
    mapErr(fn) {
        if (this.isErr()) {
            return err(fn(this._err));
        }
        else {
            return ok(this._ok);
        }
    }
    mapErrOr(fn, def) {
        if (this.isErr()) {
            return err(fn(this._err));
        }
        else {
            return err(def);
        }
    }
    mapErrOrElse(fn, defFn) {
        if (this.isErr()) {
            return err(fn(this._err));
        }
        else {
            return err(defFn(this._ok));
        }
    }
    flatMapErr(fn) {
        if (this.isErr()) {
            return fn(this._err);
        }
        else {
            return ok(this._ok);
        }
    }
    flatMapErrOr(fn, def) {
        if (this.isErr()) {
            return fn(this._err);
        }
        else {
            return def;
        }
    }
    flatMapErrOrElse(fn, defFn) {
        if (this.isErr()) {
            return fn(this._err);
        }
        else {
            return defFn(this._ok);
        }
    }
    and(ok) {
        if (this.isOk()) {
            return ok;
        }
        else {
            return err(this._err);
        }
    }
    andThen(fn) {
        if (this.isOk()) {
            return fn(this._ok);
        }
        else {
            return err(this._err);
        }
    }
    or(ok) {
        if (this.isErr()) {
            return ok;
        }
        else {
            return this;
        }
    }
    orElse(fn) {
        if (this.isErr()) {
            return fn(this._err);
        }
        else {
            return this;
        }
    }
    ifOk(fn, errFn) {
        if (this.isOk()) {
            fn(this._ok);
        }
        else if (errFn) {
            errFn(this._err);
        }
        return this;
    }
    ifErr(fn, okFn) {
        if (this.isErr()) {
            fn(this._err);
        }
        else if (okFn) {
            okFn(this._ok);
        }
        return this;
    }
    fromJSON(json) {
        if (json) {
            if (json.ok) {
                return ok(json.ok);
            }
            else if (json.err) {
                return err(json.err);
            }
        }
        throw new TypeError("Invalid json for Result");
    }
    toJSON() {
        if (this.isOk()) {
            return {
                ok: this.map(toJSON).unwrap(),
            };
        }
        else {
            return {
                err: this.mapErr(toJSON).unwrapErr(),
            };
        }
    }
    toJS() {
        if (this.isOk()) {
            return {
                ok: this.map(toJS).unwrap(),
            };
        }
        else {
            return {
                err: this.mapErr(toJS).unwrapErr(),
            };
        }
    }
}
export const ok = (value) => new Result(CREATE_SECRET, value, NULL_SECRET);
export const err = (error) => new Result(CREATE_SECRET, NULL_SECRET, error);
