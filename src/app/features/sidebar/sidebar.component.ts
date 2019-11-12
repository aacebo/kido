import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { IStream, IStreamMessage } from '../../resources/stream';

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

  onResize(e: number) {
    this.width += e;
  }
}
