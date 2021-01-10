export function toJS(value: any) {
  return value != null && typeof value.toJS === "function"
    ? value.toJS()
    : value;
}
