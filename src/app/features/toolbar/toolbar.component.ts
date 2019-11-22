import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';

import { StreamType, IStream } from '../../resources/stream';

@Component({
  selector: 'kido-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  host: { class: 'navbar' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  @Input() stream?: IStream;

  @Output() add = new EventEmitter<StreamType | undefined>();
  @Output() remove = new EventEmitter<IStream>();
  @Output() clear = new EventEmitter<IStream>();
  @Output() menu = new EventEmitter<void>();

  onMenu() {
    this.menu.emit();
  }

  onAdd(e?: StreamType) {
    this.add.emit(e);
  }

  onRemove() {
    this.remove.emit(this.stream);
  }

  onClear() {
    this.clear.emit(this.stream);
  }
}
