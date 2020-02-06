import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { take } from 'rxjs/operators';

import { IUniDialog } from './dialog.interface';
import { IUniDialogOptions } from './dialog-options.interface';
import { UniDialogRef } from './dialog-ref.class';
import { UniDialogContainerComponent } from './components/dialog-container/dialog-container.component';
import { UNI_DIALOG_OPTIONS, UNI_DIALOG_DEFAULT_OPTIONS } from './dialog-options.constant';
import { UNI_DIALOG_CONTENT } from './dialog-content.constant';
import { UNI_DIALOG_DATA } from './dialog-data.constant';

@Injectable()
export class UniDialogService {
  private _index = -1;
  private readonly _dialogs: IUniDialog[] = [];

  private get _id() {
    this._index++;
    return this._index;
  }

  constructor(
    private readonly _overlay: Overlay,
    private readonly _resolver: ComponentFactoryResolver,
  ) {}

  find(id: number) {
    return this._dialogs.find(t => t.id === id);
  }

  remove(id: number) {
    for (let i = 0; i < this._dialogs.length; i++) {
      if (this._dialogs[i].id === id) {
        this._dialogs.splice(i, 1);
        return i;
      }
    }

    return -1;
  }

  open<T = any>(content: T, options?: IUniDialogOptions) {
    const overlayRef = this._overlay.create({
      ...UNI_DIALOG_DEFAULT_OPTIONS,
      ...options,
      positionStrategy: this._getPositionStrategy(),
    });

    const dialogRef = new UniDialogRef(overlayRef, options.disableClose);
    const portal = new ComponentPortal(UniDialogContainerComponent, undefined, this._getInjector(dialogRef, content, options));
    overlayRef.attach(portal);
    const dialog: IUniDialog = {
      id: this._id,
      ref: dialogRef,
    };

    dialogRef.closed.pipe(take(1)).subscribe(() => {
      this.remove(dialog.id);
    });

    this._dialogs.push(dialog);

    return dialog;
  }

  private _getInjector<T = any>(ref: UniDialogRef, content: T, options?: IUniDialogOptions) {
    const tokens = new WeakMap();

    tokens.set(ComponentFactoryResolver, this._resolver);
    tokens.set(UniDialogRef, ref);
    tokens.set(UNI_DIALOG_OPTIONS, options);
    tokens.set(UNI_DIALOG_CONTENT, content);

    if (options.data) {
      tokens.set(UNI_DIALOG_DATA, options.data);
    }

    return new PortalInjector(null, tokens);
  }

  private _getPositionStrategy() {
    const pb = this._overlay.position().global();
    return pb.centerVertically().centerHorizontally();
  }
}
