import { Directionality } from '@angular/cdk/bidi';
import { ScrollStrategy } from '@angular/cdk/overlay';

export interface IUniDialogOptions<T = any> {
  width?: string | number;
  height?: string | number;
  minWidth?: string | number;
  minHeight?: string | number;
  maxWidth?: string | number;
  maxHeight?: string | number;
  disableClose?: boolean;
  hasBackdrop?: boolean;
  disposeOnNavigation?: boolean;
  panelClass?: string;
  backdropClass?: string;
  direction?: Directionality;
  scrollStrategy?: ScrollStrategy;
  data?: T;
}
