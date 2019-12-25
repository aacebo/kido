import { Color, Size } from '../enums';

import { ButtonTheme } from './button-theme.enum';

export function getButtonClass(
  _color: Color,
  _theme: ButtonTheme,
  _size: Size,
) {
  const map = { };

  for (const theme of Object.getOwnPropertyNames(ButtonTheme)) {
    for (const color of Object.getOwnPropertyNames(Color)) {
      const ptheme = ButtonTheme[theme] ? `${ButtonTheme[theme]}-` : '';
      const p = `btn-${ptheme}${Color[color]}`;
      map[p] = _color === Color[color] && _theme === ButtonTheme[theme];
    }
  }

  for (const size of Object.getOwnPropertyNames(Size)) {
    map[`btn-${Size[size]}`] = _size === Size[size];
  }

  return map;
}
