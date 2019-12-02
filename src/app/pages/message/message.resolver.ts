import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { MessageService } from '../../resources/message';

@Injectable()
export class MessageResolver implements Resolve<any> {
  constructor(private readonly _messageService: MessageService) { }

  resolve(route: ActivatedRouteSnapshot) {
    const id = route.paramMap.get('id');

    if (id) {
      this._messageService.setActive(id);
    }
  }
}
