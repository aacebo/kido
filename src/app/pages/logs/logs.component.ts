import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { LogService } from '../../resources/log';

@Component({
  selector: 'kido-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogsComponent implements OnInit {
  constructor(readonly logService: LogService) { }

  ngOnInit() {
    document.title = 'Kido - Logs';
  }
}
