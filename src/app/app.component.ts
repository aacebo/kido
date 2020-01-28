import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { ElectronService } from './core/services';
import { ISystem, SystemService } from './resources/system';
import { RouterService } from './resources/router';
import { HotkeysService } from './features/hotkeys';

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
    private readonly _hotkeysService: HotkeysService,
  ) { }

  ngOnInit() {
    this._electronService.on('system', (system: ISystem) => {
      this.systemService.setSystem(system);
    });

    this._electronService.on('hotkeys', () => {
      this._hotkeysService.open();
    });

    this._electronService.on('fullscreen', (fullscreen: boolean) => {
      this.systemService.setFullscreen(fullscreen);
    });

    window.addEventListener('online', () => {
      this.systemService.setOnline(true, true);
    });

    window.addEventListener('offline', () => {
      this.systemService.setOnline(false, true);
    });

    this.systemService.setOnline(navigator.onLine);
  }
}
