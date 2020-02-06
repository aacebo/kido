import { Component, ChangeDetectionStrategy, Inject, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { UNI_TOAST_OPTIONS } from './toast-options.constant';
import { UNI_TOAST_CONFIG } from './toast-config.constant';
import { IUniToastOptions } from './toast-options.interface';
import { IUniToastConfig } from './toast-config.interface';
import { UniToastRef } from './toast-ref.class';

@Component({
  moduleId: module.id,
  selector: 'uni-toast',
  exportAs: 'uniToast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  host: {
    class: 'uni-toast',
    '[class.info]': 'options.type === "info"',
    '[class.success]': 'options.type === "success"',
    '[class.warning]': 'options.type === "warning"',
    '[class.danger]': 'options.type === "danger"',
    '[class.dismissable]': 'config.tapToDismiss',
    '(click)': 'onClick()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UniToastComponent implements OnInit, OnDestroy {
  readonly progress = new BehaviorSubject(0);

  private _interval: NodeJS.Timer;
  private _timeout: NodeJS.Timer;
  private readonly _ticks = 25;
  private readonly _total = 100;

  private get _tick() {
    return (this._total / this.options.duration) * this._ticks;
  }

  constructor(
    @Inject(UNI_TOAST_CONFIG) readonly config: IUniToastConfig,
    @Inject(UNI_TOAST_OPTIONS) readonly options: IUniToastOptions,
    private readonly _toastRef: UniToastRef,
  ) {}

  ngOnInit() {
    if (this.options.duration) {
      this._timeout = setTimeout(() => {
        this._toastRef.dismiss();
      }, this.options.duration);

      if (this.config.progressBar) {
        this._interval = setInterval(() => {
          this.progress.next(this.progress.value + this._tick);
        }, this._ticks);
      }
    }
  }

  ngOnDestroy() {
    if (this._timeout) {
      clearTimeout(this._timeout);

      if (this._interval) {
        clearInterval(this._interval);
      }
    }
  }

  onClick() {
    if (this.config.tapToDismiss) {
      this._toastRef.dismiss();
    }
  }
}
