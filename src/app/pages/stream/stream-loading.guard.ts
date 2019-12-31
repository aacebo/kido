import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { skipWhile, map } from 'rxjs/operators';

import { StreamService } from '../../resources/stream';

@Injectable()
export class StreamLoadingGuard implements CanActivate {
  constructor(private readonly _streamService: StreamService) { }

  canActivate() {
    this._streamService.get();

    return this._streamService.loading$.pipe(
      skipWhile(v => v === true),
      map(() => true),
    );
  }
}
