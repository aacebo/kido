import { ConnectedPosition } from '@angular/cdk/overlay';

import { UniPosition } from './position.enum';

type xType = 'center' | 'start' | 'end';
type yType = 'center' | 'top' | 'bottom';
const UNI_POSITION_OFFSET = 16;

export function getUniPosition(position: UniPosition): ConnectedPosition {
  let originX: xType = 'center';
  let originY: yType = 'top';
  let overlayX: xType = 'center';
  let overlayY: yType = 'bottom';
  let offsetX = 0;

  if (position === UniPosition.Bottom) {
    originY = 'bottom';
    overlayX = 'center';
    overlayY = 'top';
  } else if (position === UniPosition.Left) {
    originX = 'start';
    originY = 'center';
    overlayX = 'end';
    overlayY = 'center';
  } else if (position === UniPosition.Right) {
    originX = 'end';
    originY = 'center';
    overlayX = 'start';
    overlayY = 'center';
  } else if (position === UniPosition.BottomLeft) {
    originY = 'bottom';
    overlayX = 'end';
    overlayY = 'top';
    offsetX = UNI_POSITION_OFFSET;
  } else if (position === UniPosition.BottomRight) {
    originY = 'bottom';
    overlayX = 'start';
    overlayY = 'top';
    offsetX = UNI_POSITION_OFFSET * -1;
  } else if (position === UniPosition.TopLeft) {
    overlayX = 'end';
    offsetX = UNI_POSITION_OFFSET;
  } else if (position === UniPosition.TopRight) {
    overlayX = 'start';
    offsetX = UNI_POSITION_OFFSET * -1;
  }

  return {
    originX,
    originY,
    overlayX,
    overlayY,
    offsetX,
  };
}
