export function arrayToMap<T = any>(key: keyof T, arr: T[]): { [key: string]: T } {
  const map = { };

  for (const v of arr) {
    map[v[key as string]] = v;
  }

  return map;
}
