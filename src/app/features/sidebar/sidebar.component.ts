import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { IStream } from '../../resources/stream';

@Component({
  selector: 'kido-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  @Input() streams: IStream[] = [];
  @Input() active?: string;
  @Input() connected: { [streamId: string]: boolean } = { };
  @Input()
  get open() { return this._open; }
  set open(v: boolean) {
    this._open = coerceBooleanProperty(v);
  }
  private _open?: boolean;

  @Output() selected = new EventEmitter<IStream>();

  width = 150;

  onResize(e: number) {
    this.width += e;
  }

  navigate(e: IStream) {
    this.selected.emit(e);
  }
}
