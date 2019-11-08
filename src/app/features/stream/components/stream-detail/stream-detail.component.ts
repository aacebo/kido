import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { IStream } from '../../../../resources/stream';

@Component({
  selector: 'kido-stream-detail',
  templateUrl: './stream-detail.component.html',
  styleUrls: ['./stream-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StreamDetailComponent {
  @Input() stream: IStream;
}
