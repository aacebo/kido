import { InjectionToken } from '@angular/core';

import { IUniDialogOptions } from './dialog-options.interface';

export const UNI_DIALOG_OPTIONS = new InjectionToken<IUniDialogOptions>('UNI_DIALOG_OPTIONS');

export const UNI_DIALOG_DEFAULT_OPTIONS: IUniDialogOptions = {
  width: 'auto',
  height: 'auto',
  hasBackdrop: true,
  backdropClass: 'cdk-overlay-dark-backdrop',
};
