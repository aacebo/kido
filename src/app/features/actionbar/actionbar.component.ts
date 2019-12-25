import { ChangeDetectionStrategy, Component, Output, EventEmitter } from '@angular/core';

import { Hotkeys } from '../../lib/hotkeys';

@Component({
  selector: 'kido-actionbar',
  templateUrl: './actionbar.component.html',
  styleUrls: ['./actionbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionbarComponent {
  @Output() add = new EventEmitter<void>();
  @Output() logs = new EventEmitter<void>();

  @Hotkeys('mod+n', 'Add New Stream')
  onAdd() {
    this.add.emit();
  }

  @Hotkeys('mod+l', 'System Logs')
  onLogs() {
    this.logs.emit();
  }
}
