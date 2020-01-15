import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

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
    private readonly _router: Router,
  ) { }

  ngOnInit() {
    this._router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this._electronService.send('ga.pageview', e.urlAfterRedirects);
      }
    });

    this._electronService.on('log', (log) => {
      this._logService.add(log.message, 'Electron', log.type);
    });

    this._electronService.on('system', (system: ISystem) => {
      this.systemService.setSystem(system);
    });

    window.addEventListener('online', () => {
      this.systemService.setOnline(true, true);
    });

    window.addEventListener('offline', () => {
      this.systemService.setOnline(false, true);
    });

    this.systemService.setOnline(navigator.onLine);
    this._logService.get();
  }
}
