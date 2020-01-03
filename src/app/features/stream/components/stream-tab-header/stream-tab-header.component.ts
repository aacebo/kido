import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { IStream } from '../../../../resources/stream';
import { ConnectionType } from '../../../connection-icon';

@Component({
  selector: 'kido-stream-tab-header',
  templateUrl: './stream-tab-header.component.html',
  styleUrls: ['./stream-tab-header.component.scss'],
  host: { '[class.active]': 'activeId === stream._id' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StreamTabHeaderComponent {
  @Input() stream: IStream;
  @Input() activeId?: string;
  @Input() connected: { [streamId: string]: Date };
  @Input() connecting: { [streamId: string]: boolean };

  @Output() remove = new EventEmitter<Event>();

  readonly ConnectionType = ConnectionType;
}
