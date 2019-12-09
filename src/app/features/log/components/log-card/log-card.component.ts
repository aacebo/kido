import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { ILog } from '../../../../resources/log';

@Component({
  selector: 'kido-log-card',
  templateUrl: './log-card.component.html',
  styleUrls: ['./log-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogCardComponent {
  @Input() log: ILog;
}
