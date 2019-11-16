import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

import { StreamType } from '../../resources/stream';

@Component({
  selector: 'kido-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  host: { class: 'navbar' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  @Output() add = new EventEmitter<StreamType | undefined>();
  @Output() menu = new EventEmitter<void>();
}
