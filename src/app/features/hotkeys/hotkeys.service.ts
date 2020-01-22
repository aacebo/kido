import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { HotkeysModalComponent } from './hotkeys-modal.component';

@Injectable({
  providedIn: 'root',
})
export class HotkeysService {
  constructor(private readonly _modal: NgbModal) { }

  open() {
    this._modal.open(HotkeysModalComponent);
  }
}
