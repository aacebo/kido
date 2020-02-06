import { InjectionToken } from '@angular/core';

import { IUniToastConfig } from './toast-config.interface';

export const UNI_TOAST_CONFIG = new InjectionToken<IUniToastConfig>('UNI_TOAST_CONFIG');

export const UNI_TOAST_DEFAULT_CONFIG: IUniToastConfig = {
  progressBar: true,
  tapToDismiss: true,
  margin: 10,
};
