import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Hotkeys } from '../../ui/hotkeys';
import { IStream } from '../../resources/stream';

@Component({
  selector: 'kido-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  host: { class: 'navbar' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  @Input() stream?: IStream;
  @Input() connected?: Date;

  @Output() add = new EventEmitter<IStream | undefined>();
  @Output() remove = new EventEmitter<IStream>();
  @Output() clear = new EventEmitter<IStream>();
  @Output() menu = new EventEmitter<void>();

  @Hotkeys('ctrl+n', 'Add New Stream')
  onAdd(stream?: IStream) {
    this.add.emit(stream);
  }

  @Hotkeys('ctrl+m', 'Toggle Menu')
  onMenu() {
    this.menu.emit();
  }

  onRemove() {
    this.remove.emit(this.stream);
  }

  onClear() {
    this.clear.emit(this.stream);
  }
}
