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
    readonly systemService: SystemService,
    private readonly _electronService: ElectronService,
  ) { }

  ngOnInit() {
    this._electronService.on('system', (system: ISystem) => {
      this.systemService.add(system);
    });
  }
}
