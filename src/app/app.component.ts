import { Component, ChangeDetectionStrategy, OnInit, ApplicationRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ElectronService } from './core/services';
import { ISystem, SystemService } from './resources/system';
import { StreamService, StreamType, IStream } from './resources/stream';
import { AddStreamModalService } from './features/stream';
import { MessageService } from './resources/message';

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
    private readonly _messageService: MessageService,
    private readonly _addStreamModalService: AddStreamModalService,
    private readonly _electronService: ElectronService,
    private readonly _app: ApplicationRef,
  ) { }

  ngOnInit() {
    this._electronService.on('system', (system: ISystem) => {
      this.systemService.add(system);
    });

    this.streamService.getStreams();
    this._messageService.get();
  }

  onAdd(e?: StreamType) {
    this._addStreamModalService.open(e, (v?: Partial<IStream>) => {
      if (v) {
        this.streamService.addStream(v.type, v.name, v.url, v.description);
      }
    });

    this._app.tick();
  }

  onMenu() {
    this.menu$.next(!this.menu$.value);
    this._app.tick();
  }
}
