import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { ElectronService } from './core/services';
import { ISystem, SystemService } from './resources/system';

@Component({
  selector: 'kido-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(
    private readonly _electronService: ElectronService,
    private readonly _systemService: SystemService,
  ) { }

  ngOnInit() {
    this._electronService.on('system', (system: ISystem) => {
      this._systemService.add(system);
    });
  }
}
