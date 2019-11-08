import { Component, ChangeDetectionStrategy } from '@angular/core';

import { StreamService, IStream } from '../../resources/stream';

@Component({
  selector: 'kido-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StreamComponent {
  constructor(readonly streamService: StreamService) { }

  onUpdate(e: Partial<IStream>) {
    this.streamService.updateStream(e);
  }
}
