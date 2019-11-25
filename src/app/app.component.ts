import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ElectronService } from './core/services';
import { ISystem, SystemService } from './resources/system';
import { StreamService, IStream } from './resources/stream';
import { MessageService } from './resources/message';
import { StreamModalService } from './features/stream';

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
    private readonly _streamModalService: StreamModalService,
    private readonly _electronService: ElectronService,
  ) { }

  ngOnInit() {
    this._electronService.on('system', (system: ISystem) => {
      this.systemService.add(system);
    });

    this.streamService.get();
  }

  onAdd(e: IStream) {
    this._streamModalService.open(e, (v?: Partial<IStream>) => {
      if (v) {
        if (e) {
          this.streamService.update({
            ...e,
            ...v,
          });
        } else {
          this.streamService.add(v.type, v.name, v.url, v.description);
        }
      }
    });
  }

  onRemove(e: IStream) {
    this.streamService.remove(e._id, e._rev);
  }

  onClear(e: IStream) {
    this._messageService.removeAll(e._id);
  }

  onMenu() {
    this.menu$.next(!this.menu$.value);
  }

  onSelected(e: IStream) {
    this.streamService.setActive(e._id);
  }
}
