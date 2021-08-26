export function toJSON(value) {
    return value != null && typeof value.toJSON === "function"
        ? value.toJSON()
        : value;
}
