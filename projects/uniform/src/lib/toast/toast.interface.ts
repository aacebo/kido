import { UniToastRef } from './toast-ref.class';
import { UniToastType } from './toast-type.enum';
import { UniToastPosition } from './toast-position.enum';

export interface IUniToast<T = any> {
  id: number;
  type: UniToastType;
  position: UniToastPosition;
  component: T;
  ref: UniToastRef;
}
