import { Color } from '../../../core/enums';

import { ButtonTheme } from './button-theme.enum';
import { ButtonSize } from './button-size.enum';

export function getButtonClass(
  _color: Color,
  _theme: ButtonTheme,
  _size: ButtonSize,
) {
  const map = { };

  for (const theme of Object.getOwnPropertyNames(ButtonTheme)) {
    for (const color of Object.getOwnPropertyNames(Color)) {
      const ptheme = ButtonTheme[theme] ? `${ButtonTheme[theme]}-` : '';
      const p = `btn-${ptheme}${Color[color]}`;
      map[p] = _color === Color[color] && _theme === ButtonTheme[theme];
    }
  }

  for (const size of Object.getOwnPropertyNames(ButtonSize)) {
    map[`btn-${ButtonSize[size]}`] = _size === ButtonSize[size];
  }

  return map;
}
