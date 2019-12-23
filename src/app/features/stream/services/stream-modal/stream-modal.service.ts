import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { IStream } from '../../../../resources/stream';
import { StreamModalComponent } from '../../components/stream-modal';

@Injectable({
  providedIn: 'root',
})
export class StreamModalService {
  private _ref?: NgbModalRef<typeof StreamModalComponent>;

  constructor(private readonly _modal: NgbModal) { }

  open(stream?: IStream, cb?: (stream?: Partial<IStream>) => void) {
    if (!this._modal.hasOpenModals()) {
      this._ref = this._modal.open(StreamModalComponent, {
        centered: true,
      });

      this._ref.componentInstance.stream = stream;
      this._ref.result.then(
        (res: Partial<IStream>) => cb(res),
        () => cb(),
      );
    }
  }
}
