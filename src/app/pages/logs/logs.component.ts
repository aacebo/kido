import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

@Component({
  selector: 'kido-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogsComponent implements OnInit {
  ngOnInit() {
    document.title = 'Kido - Logs';
  }
}
