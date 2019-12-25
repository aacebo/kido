import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'kido-horizontal-split',
  template: '',
  styleUrls: ['./horizontal-split.component.scss'],
  host: {
    class: 'kido-horizontal-split',
    '[class.kido-horizontal-split--resizing]': 'resizing',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HorizontalSplitComponent {
  @Output() onresize = new EventEmitter<number>();

  get resizing() {
    return this._x !== undefined;
  }

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
