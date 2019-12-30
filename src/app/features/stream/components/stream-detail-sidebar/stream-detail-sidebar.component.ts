import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'kido-stream-detail-sidebar',
  templateUrl: './stream-detail-sidebar.component.html',
  styleUrls: ['./stream-detail-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StreamDetailSidebarComponent {
  @Input()
  get open() { return this._open; }
  set open(v: boolean) {
    this._open = coerceBooleanProperty(v);
  }
  private _open?: boolean;

  width = 150;

  onResize(e: number) {
    this.width += e;
  }
}
