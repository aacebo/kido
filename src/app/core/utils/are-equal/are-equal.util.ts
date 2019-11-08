export function areEqual(one: any, two: any) {
  for (const key of Object.getOwnPropertyNames(one)) {
    if (one[key] !== two[key]) {
      return false;
    }
  }

  return true;
}
