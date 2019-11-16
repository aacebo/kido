import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

import { StreamType } from '../../resources/stream';
import { Hotkeys } from '../../ui/hotkeys';

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

  @Hotkeys('ctrl+m', 'Toggle Side Menu')
  onMenu() {
    this.menu.emit();
  }

  @Hotkeys('ctrl+n', 'Add New Stream')
  onAdd(e: StreamType) {
    this.add.emit(e);
  }
}
