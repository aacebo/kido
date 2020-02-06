import { UniToastType } from './toast-type.enum';
import { UniToastPosition } from './toast-position.enum';

export interface IUniToastOptions {
  message: string;
  type: UniToastType;
  position: UniToastPosition;
  title?: string;
  duration?: number;
  dismissable?: boolean;
  panelClass?: string;
}
