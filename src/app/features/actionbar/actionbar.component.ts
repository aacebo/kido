import { ChangeDetectionStrategy, Component, Output, EventEmitter } from '@angular/core';

import { Hotkeys } from '../../ui/hotkeys';

@Component({
  selector: 'kido-actionbar',
  templateUrl: './actionbar.component.html',
  styleUrls: ['./actionbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionbarComponent {
  @Output() add = new EventEmitter<void>();

  @Hotkeys('ctrl+n', 'Add New Stream')
  onAdd() {
    this.add.emit();
  }
}
