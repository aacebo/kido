import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { StreamService } from '../../resources/stream';

@Injectable()
export class StreamResolver implements Resolve<any> {
  constructor(private readonly _streamService: StreamService) { }

  resolve(route: ActivatedRouteSnapshot) {
    if (route.paramMap && route.paramMap.has('id')) {
      this._streamService.setActive(route.paramMap.get('id'));
    }
  }
}
