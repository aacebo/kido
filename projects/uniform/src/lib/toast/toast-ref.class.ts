import { OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';

export class UniToastRef {
  private readonly _closed = new Subject<void>();
  get closed() {
    return this._closed.asObservable();
  }

  get config() {
    return this._overlayRef.getConfig();
  }

  get position() {
    return this._overlayRef.overlayElement.getBoundingClientRect();
  }

  constructor(private readonly _overlayRef: OverlayRef) {}

  dismiss() {
    this._closed.next();
    this._overlayRef.detach();
  }

  updatePosition(strategy: PositionStrategy) {
    this._overlayRef.updatePositionStrategy(strategy);
  }
}
