import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';

import { IMessage } from './message.interface';

@Component({
  moduleId: module.id,
  exportAs: 'kidoMessenger',
  selector: 'kido-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss'],
  host: { class: 'kido-messenger' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MessengerComponent {
  @Input() messages: IMessage[] = [];
}
