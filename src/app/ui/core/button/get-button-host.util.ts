import { Color } from '../../../core/enums';

import { ButtonTheme } from './button-theme.enum';
import { ButtonSize } from './button-size.enum';

export function getButtonHost() {
  const map = { };

  for (const theme of Object.getOwnPropertyNames(ButtonTheme)) {
    for (const color of Object.getOwnPropertyNames(Color)) {
      const ptheme = ButtonTheme[theme] ? `${ButtonTheme[theme]}-` : '';
      const p = `btn-${ptheme}${Color[color]}`;
      map[`[class.${p}]`] = `color === "${Color[color]}" && theme === "${ButtonTheme[theme]}"`;
    }
  }

  for (const size of Object.getOwnPropertyNames(ButtonSize)) {
    map[`[class.btn-${ButtonSize[size]}]`] = `size === "${ButtonSize[size]}"`;
  }

  return map;
}
