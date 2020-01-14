import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { StreamService, StreamType } from '../../resources/stream';
import { SystemService } from '../../resources/system';

@Component({
  selector: 'kido-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  host: { class: 'kido-landing' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class LandingComponent {
  constructor(
    readonly systemService: SystemService,
    private readonly _router: Router,
    private readonly _streamService: StreamService,
  ) { }

  getStarted() {
    this._streamService.add(StreamType.WebSocket, 'New Stream');
    this._router.navigateByUrl('/stream');
  }
}
