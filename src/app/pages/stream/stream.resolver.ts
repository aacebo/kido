import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { map, take } from 'rxjs/operators';

import { StreamService } from '../../resources/stream';

@Injectable()
export class StreamResolver implements Resolve<string | undefined> {
  constructor(private readonly _streamService: StreamService) { }

  resolve() {
    return this._streamService.entities$.pipe(
      take(1),
      map(entities => {
        if (entities.length > 0) {
          return entities[0]._id;
        }

        return undefined;
      }),
    );
  }
}
