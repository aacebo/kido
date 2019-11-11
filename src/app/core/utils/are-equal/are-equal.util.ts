export function areEqual(one: any, two: any) {
  const keys = [
    ...Object.getOwnPropertyNames(one),
    ...Object.getOwnPropertyNames(two),
  ];

  for (const key of keys) {
    if (one[key] !== two[key]) {
      return false;
    }
  }

  return true;
}
