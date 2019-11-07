import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { IStream } from '../../../../resources/stream';
import { STREAM_TYPE_ICON_URLS } from '../../constants';

@Component({
  selector: 'kido-stream-list-item',
  templateUrl: './stream-list-item.component.html',
  styleUrls: ['./stream-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StreamListItemComponent {
  @Input() stream: IStream;

  readonly STREAM_TYPE_ICON_URLS = STREAM_TYPE_ICON_URLS;
}
