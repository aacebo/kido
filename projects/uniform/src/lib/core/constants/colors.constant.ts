import { UniColor } from '../enums';

export const UNI_HOST_COLORS = {
  '[class.primary]': 'color === "primary"',
  '[class.secondary]': 'color === "secondary"',
  '[class.success]': 'color === "success"',
  '[class.warning]': 'color === "warning"',
  '[class.danger]': 'color === "danger"',
};

export function uniColors(color: UniColor) {
  return {
    primary: color === UniColor.Primary,
    secondary: color === UniColor.Secondary,
    success: color === UniColor.Success,
    warning: color === UniColor.Warning,
    danger: color === UniColor.Danger,
  };
}
