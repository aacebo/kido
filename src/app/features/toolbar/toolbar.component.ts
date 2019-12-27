import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Hotkeys, HotkeyBase } from '../../lib/hotkeys';
import { IStream } from '../../resources/stream';

@Component({
  selector: 'kido-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  host: { class: 'navbar' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent extends HotkeyBase {
  @Input() stream?: IStream;
  @Input() connected?: Date;

  @Output() edit = new EventEmitter<IStream>();
  @Output() remove = new EventEmitter<IStream>();
  @Output() clear = new EventEmitter<IStream>();
  @Output() menu = new EventEmitter<void>();

  @Hotkeys('mod+m', 'Toggle Menu')
  onMenu() {
    this.menu.emit();
  }

  onEdit(stream?: IStream) {
    this.edit.emit(stream);
  }

  onRemove() {
    this.remove.emit(this.stream);
  }

  onClear() {
    this.clear.emit(this.stream);
  }
}
