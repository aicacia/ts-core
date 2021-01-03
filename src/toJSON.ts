export function toJSON(value: any) {
  return value != null && typeof value.toJSON === "function"
    ? value.toJSON()
    : value;
}
