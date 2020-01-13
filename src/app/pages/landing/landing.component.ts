import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { StreamService, StreamType } from '../../resources/stream';

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
    private readonly _router: Router,
    private readonly _streamService: StreamService,
  ) { }

  getStarted() {
    this._streamService.add(StreamType.WebSocket, 'New Stream');
    this._router.navigateByUrl('/stream');
  }
}
