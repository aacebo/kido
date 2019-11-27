import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { environment } from '../../../environments/environment';
import { StreamService } from '../../resources/stream';

@Injectable()
export class StreamResolver implements Resolve<any> {
  constructor(private readonly _streamService: StreamService) { }

  resolve(route: ActivatedRouteSnapshot) {
    const id = route.paramMap.get('id') || localStorage.getItem(environment.activeStreamKey);

    if (id) {
      this._streamService.setActive(id);
    }
  }
}
