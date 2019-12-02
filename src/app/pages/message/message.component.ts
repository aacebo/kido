import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'kido-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent { }
