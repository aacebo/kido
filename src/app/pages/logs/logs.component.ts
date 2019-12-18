import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { LogService } from '../../resources/log';
import { SystemService } from '../../resources/system';

@Component({
  selector: 'kido-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogsComponent implements OnInit {
  constructor(
    readonly systemService: SystemService,
    readonly logService: LogService,
  ) { }

  ngOnInit() {
    document.title = 'Kido - Logs';
  }
}
