import { Color, Size } from '../enums';

import { ButtonTheme } from './button-theme.enum';

export function getButtonHost() {
  const map = { };

  for (const theme of Object.getOwnPropertyNames(ButtonTheme)) {
    for (const color of Object.getOwnPropertyNames(Color)) {
      const ptheme = ButtonTheme[theme] ? `${ButtonTheme[theme]}-` : '';
      const p = `btn-${ptheme}${Color[color]}`;
      map[`[class.${p}]`] = `color === "${Color[color]}" && theme === "${ButtonTheme[theme]}"`;
    }
  }

  for (const size of Object.getOwnPropertyNames(Size)) {
    map[`[class.btn-${Size[size]}]`] = `size === "${Size[size]}"`;
  }

  return map;
}
