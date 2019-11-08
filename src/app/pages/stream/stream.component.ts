import { Component, ChangeDetectionStrategy } from '@angular/core';

import { StreamService } from '../../resources/stream';

@Component({
  selector: 'kido-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StreamComponent {
  constructor(readonly streamService: StreamService) { }
}
