export function toJS(value) {
    return value != null && typeof value.toJS === "function"
        ? value.toJS()
        : value;
}
