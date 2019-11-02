import { Component, ChangeDetectionStrategy, Output, HostListener, EventEmitter } from '@angular/core';

@Component({
  selector: 'kido-horizontal-resize-bar',
  template: '',
  styleUrls: ['./horizontal-resize-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HorizontalResizeBarComponent {
  @Output() onresize = new EventEmitter<number>();

  private _x?: number;

  @HostListener('mousedown', ['$event'])
  onMouseDown(e: MouseEvent) {
    this._x = e.clientX;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (this._x !== undefined) {
      e.preventDefault();
      this.onresize.emit(e.clientX - this._x);
      this._x = e.clientX;
    }
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    if (this._x !== undefined) {
      this._x = undefined;
    }
  }
}
