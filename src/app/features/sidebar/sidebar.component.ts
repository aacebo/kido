import { Component, ChangeDetectionStrategy, Input, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { IStream, IStreamMessage } from '../../resources/stream';
import { Hotkeys } from '../../ui/hotkeys';

@Component({
  selector: 'kido-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  @Input() streams: IStream[] = [];
  @Input() active?: string;
  @Input() streamMessages: { [streamId: string]: IStreamMessage[] } = { };
  @Input() streamConnected: { [streamId: string]: boolean } = { };

  width = 200;

  private get _aidx() {
    return this.streams.map(v => v._id).indexOf(this.active);
  }

  constructor(
    private readonly _router: Router,
    private readonly _ngZone: NgZone,
  ) { }

  onResize(e: number) {
    this.width += e;
  }

  @Hotkeys('ctrl+down', 'Navigate Down')
  onDown() {
    this._navigate(this.streams[this._aidx + 1]);
  }

  @Hotkeys('ctrl+up', 'Navigate Up')
  onUp() {
    this._navigate(this.streams[this._aidx - 1]);
  }

  private _navigate(stream?: IStream) {
    if (stream) {
      this._ngZone.run(() => this._router.navigate(['/stream/', stream._id]));
    }
  }
}
