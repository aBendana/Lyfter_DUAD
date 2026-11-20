// freezes nested objects and arrays too, so stored data only changes through
// the store; a Date stays mutable inside, but the app never mutates saved dates
export function deepFreeze<T>(value: T): T {
  if (typeof value === 'object' && value !== null) {
    // Object.values is typed any[]; unknown keeps the recursion type safe
    const nestedValues: unknown[] = Object.values(value);
    Object.freeze(value);
    nestedValues.forEach(deepFreeze);
  }

  return value;
}
