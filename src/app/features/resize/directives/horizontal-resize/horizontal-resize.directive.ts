import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[kidoHorizontalResize]',
  host: { draggable: 'true' },
})
export class HorizontalResizeDirective {
  @HostListener('dragstart')
  onDragStart() {
    console.log('start');
  }

  @HostListener('dragend')
  onDragEnd() {
    console.log('end');
  }
}
