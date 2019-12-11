import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { ILog, LogType } from '../../../../resources/log';

@Component({
  selector: 'kido-log-card',
  templateUrl: './log-card.component.html',
  styleUrls: ['./log-card.component.scss'],
  host: {
    '[class.kido-log-card--info]': 'log.type === LogType.Info',
    '[class.kido-log-card--warning]': 'log.type === LogType.Warning',
    '[class.kido-log-card--error]': 'log.type === LogType.Error',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogCardComponent {
  @Input() log: ILog;

  readonly LogType = LogType;
}
