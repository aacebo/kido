import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { IStream, IStreamMessage } from '../../../../resources/stream';

@Component({
  selector: 'kido-stream-list-item',
  templateUrl: './stream-list-item.component.html',
  styleUrls: ['./stream-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StreamListItemComponent {
  @Input() stream: IStream;
  @Input() messages: IStreamMessage[] = [];
  @Input() connected?: boolean;
}
