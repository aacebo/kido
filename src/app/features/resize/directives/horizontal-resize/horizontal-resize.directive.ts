import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[kidoHorizontalResize]',
})
export class HorizontalResizeDirective {
  @Output('kidoHorizontalResize') resize = new EventEmitter<number>();

  private _x?: number;

  @HostListener('mousedown', ['$event'])
  onMouseDown(e: MouseEvent) {
    this._x = e.offsetX;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (this._x) {
      this.resize.emit(e.offsetX - this._x);
      this._x = e.offsetX;
    }
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    if (this._x) {
      this._x = undefined;
    }
  }
}
