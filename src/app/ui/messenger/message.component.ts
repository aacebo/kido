import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';

import { MessageType } from './message-type.enum';
import { IMessage } from './message.interface';

@Component({
  moduleId: module.id,
  exportAs: 'kidoMessage',
  selector: 'kido-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  host: {
    class: 'kido-message',
    '[class.kido-message--sent]': 'type === MessageType.Sent',
    '[class.kido-message--received]': 'type === MessageType.Received',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MessageComponent {
  @Input() message: IMessage;
  @Input() type: MessageType;
  @Input()
  get createdAt() { return this._createdAt; }
  set createdAt(v: number) {
    this._createdAt = coerceNumberProperty(v);
  }
  private _createdAt: number;

  @Output() selected = new EventEmitter<IMessage>();

  readonly MessageType = MessageType;

  onClick() {
    this.selected.emit(this.message);
  }
}
