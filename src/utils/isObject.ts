export function isObject(value: any) {
  return (
    value !== null && typeof value === "object" && value.constructor === Object
  );
}
