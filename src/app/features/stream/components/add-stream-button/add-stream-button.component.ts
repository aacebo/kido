import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

import { StreamType } from '../../../../resources/stream';
import { STREAM_TYPE_LABELS } from '../../constants';

@Component({
  selector: 'kido-add-stream-button',
  templateUrl: './add-stream-button.component.html',
  styleUrls: ['./add-stream-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddStreamButtonComponent {
  @Output() add = new EventEmitter<StreamType | undefined>();

  readonly StreamType = StreamType;
  readonly STREAM_TYPE_LABELS = STREAM_TYPE_LABELS;
}
