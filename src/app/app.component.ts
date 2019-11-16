import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ElectronService } from './core/services';
import { ISystem, SystemService } from './resources/system';
import { StreamService, StreamType, IStream } from './resources/stream';
import { AddStreamModalService } from './features/stream';

@Component({
  selector: 'kido-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  readonly menu$ = new BehaviorSubject(true);

  constructor(
    readonly systemService: SystemService,
    readonly streamService: StreamService,
    private readonly _addStreamModalService: AddStreamModalService,
    private readonly _electronService: ElectronService,
  ) { }

  ngOnInit() {
    this._electronService.on('system', (system: ISystem) => {
      this.systemService.add(system);
    });

    this.streamService.getStreams();
    this.streamService.getMessages();
  }

  onAdd(e?: StreamType) {
    this._addStreamModalService.open(e, (v?: Partial<IStream>) => {
      if (v) {
        this.streamService.addStream(v.type, v.name, v.url, v.description);
      }
    });
  }

  onMenu() {
    this.menu$.next(!this.menu$.value);
  }
}
