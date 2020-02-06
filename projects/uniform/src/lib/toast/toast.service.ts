import { Injectable, Inject } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector, ComponentType } from '@angular/cdk/portal';
import { take } from 'rxjs/operators';

import { IUniToast } from './toast.interface';
import { IUniToastOptions } from './toast-options.interface';
import { IUniToastConfig } from './toast-config.interface';
import { UniToastPosition } from './toast-position.enum';
import { UniToastComponent } from './toast.component';
import { UNI_TOAST_OPTIONS } from './toast-options.constant';
import { UNI_TOAST_CONFIG } from './toast-config.constant';
import { UniToastRef } from './toast-ref.class';

@Injectable()
export class UniToastService {
  private _index = -1;
  private readonly _toasts: IUniToast[] = [];

  private get _id() {
    this._index++;
    return this._index;
  }

  constructor(
    @Inject(UNI_TOAST_CONFIG) private readonly _config: IUniToastConfig,
    private readonly _overlay: Overlay,
  ) {}

  open(options: IUniToastOptions) {
    return this._create(UniToastComponent, options);
  }

  create<T>(component: ComponentType<T>, options: IUniToastOptions) {
    return this._create(component, options);
  }

  remove(id: number) {
    for (let i = 0; i < this._toasts.length; i++) {
      if (this._toasts[i].id === id) {
        this._toasts.splice(i, 1);
        return i;
      }
    }

    return -1;
  }

  find<T = any>(id: number): IUniToast<T> {
    return this._toasts.find(t => t.id === id);
  }

  private _create<T>(component: ComponentType<T>, options: IUniToastOptions): IUniToast<T> {
    const latest = this._getLatestByPosition(options.position);
    const position = latest ? latest.ref.position : undefined;
    const overlayRef = this._overlay.create({
      panelClass: options.panelClass,
      positionStrategy: this._getPositionStrategy(options.position, position),
    });

    const toastRef = new UniToastRef(overlayRef);
    const portal = new ComponentPortal(component, null, this._getInjector(toastRef, options));
    const instance = overlayRef.attach(portal).instance;
    const toast: IUniToast<T> = {
      id: this._id,
      type: options.type,
      position: options.position,
      component: instance,
      ref: toastRef,
    };

    toastRef.closed.pipe(take(1)).subscribe(() => {
      this.remove(toast.id);
      this._updatePositions(toast.position);
    });

    this._toasts.push(toast);

    return toast;
  }

  private _getInjector(ref: UniToastRef, options: IUniToastOptions) {
    const tokens = new WeakMap();

    tokens.set(UniToastRef, ref);
    tokens.set(UNI_TOAST_OPTIONS, options);
    tokens.set(UNI_TOAST_CONFIG, this._config);

    return new PortalInjector(null, tokens);
  }

  private _getPositionStrategy(position: UniToastPosition, latest: ClientRect | DOMRect) {
    const pb = this._overlay.position().global();

    if (position === UniToastPosition.TopLeft) {
      return pb.top(this._getLatestMargin(position, latest)).left(`${this._config.margin}px`);
    } else if (position === UniToastPosition.TopRight) {
      return pb.top(this._getLatestMargin(position, latest)).right(`${this._config.margin}px`);
    } else if (position === UniToastPosition.BottomLeft) {
      if (!latest) {
        return pb.bottom(this._getLatestMargin(position, latest)).left(`${this._config.margin}px`);
      } else {
        return pb.top(this._getLatestMargin(position, latest)).left(`${this._config.margin}px`);
      }
    }

    if (!latest) {
      return pb.bottom(this._getLatestMargin(position, latest)).right(`${this._config.margin}px`);
    } else {
      return pb.top(this._getLatestMargin(position, latest)).right(`${this._config.margin}px`);
    }
  }

  private _getLatestMargin(position: UniToastPosition, latest?: ClientRect | DOMRect) {
    const key: keyof ClientRect = (position === UniToastPosition.TopLeft || position === UniToastPosition.TopRight) ? 'bottom' : 'top';

    if (key === 'bottom') {
      return latest ? `${latest[key] + this._config.margin}px` : `${this._config.margin}px`;
    } else {
      return latest ? `${latest[key] - latest.height - this._config.margin}px` : `${this._config.margin}px`;
    }
  }

  private _getToastsByPosition(position: UniToastPosition) {
    return this._toasts.filter(t => t.position === position)
                       .sort((a, b) => a.id - b.id);
  }

  private _getLatestByPosition(position: UniToastPosition) {
    const toasts =  this._getToastsByPosition(position);
    return toasts[toasts.length - 1];
  }

  private _updatePositions(position: UniToastPosition) {
    const toasts =  this._getToastsByPosition(position);

    for (let i = 0; i < toasts.length; i++) {
      toasts[i].ref.updatePosition(this._getPositionStrategy(
        toasts[i].position,
        toasts[i - 1] ? toasts[i - 1].ref.position : undefined,
      ));
    }
  }
}
