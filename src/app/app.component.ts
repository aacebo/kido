import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

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
    this._electronService.on('log', args => console.log(args));
    this._electronService.on('system', (system: ISystem) => {
      this.systemService.add(system);
    });

    this._electronService.on('update--checking-for-update', () => {
      console.log('update--checking-for-update');
    });

    this._electronService.on('update--update-available', () => {
      console.log('update--update-available');
    });

    this._electronService.on('update--update-not-available', () => {
      console.log('update--update-not-available');
    });
  }
}
