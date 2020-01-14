import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map, skipWhile, take } from 'rxjs/operators';

import { StreamService } from '../../resources/stream';

@Injectable()
export class StreamLoadingGuard implements CanActivate {
  constructor(
    private readonly _router: Router,
    private readonly _streamService: StreamService,
  ) { }

  canActivate() {
    this._streamService.get();

    return this._streamService.state$.pipe(
      skipWhile(state => state.loading === true),
      map(state => Object.values(state.streams)),
      map(entities => entities && entities.length > 0),
      map(canActivate => canActivate || this._router.parseUrl('/landing')),
      take(1),
    );
  }
}
