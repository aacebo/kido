import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { StreamType } from '../../../../resources/stream';
import { AddStreamModalComponent } from '../../components';

@Injectable({
  providedIn: 'root',
})
export class AddStreamModalService {
  private _ref?: NgbModalRef<typeof AddStreamModalComponent>;

  constructor(private readonly _modalService: NgbModal) { }

  open(type?: StreamType) {
    this._ref = this._modalService.open(AddStreamModalComponent, {
      centered: true,
    });

    this._ref.componentInstance.type = type;
  }
}
