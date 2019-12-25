import { Size } from '../enums';

export function getFormControlClass(
  _size: Size,
) {
  const map = { };

  for (const size of Object.getOwnPropertyNames(Size)) {
    map[`form-control-${Size[size]}`] = _size === Size[size];
  }

  return map;
}
