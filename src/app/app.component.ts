import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { ElectronService } from './core/services';
import { ISystem, SystemService } from './resources/system';
import { LogService } from './resources/log';
import { RouterService } from './resources/router';

@Component({
  selector: 'kido-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(
    readonly systemService: SystemService,
    readonly routerService: RouterService,
    private readonly _electronService: ElectronService,
    private readonly _logService: LogService,
  ) { }

  ngOnInit() {
    this._electronService.on('log', args => {
      this._logService.create(args);
    });

    this._electronService.on('system', (system: ISystem) => {
      this.systemService.add(system);
    });
  }
}
