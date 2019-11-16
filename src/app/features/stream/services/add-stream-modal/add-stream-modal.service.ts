import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { StreamType, IStream } from '../../../../resources/stream';
import { AddStreamModalComponent } from '../../components/add-stream-modal';

@Injectable({
  providedIn: 'root',
})
export class AddStreamModalService {
  private _ref?: NgbModalRef<typeof AddStreamModalComponent>;

  constructor(private readonly _modalService: NgbModal) { }

  open(type?: StreamType, cb?: (stream?: Partial<IStream>) => void) {
    this._ref = this._modalService.open(AddStreamModalComponent, {
      centered: true,
    });

    this._ref.componentInstance.type = type;
    this._ref.result.then((res: Partial<IStream>) => cb(res), () => cb());
  }
}
