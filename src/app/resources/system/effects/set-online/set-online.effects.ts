import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';

import * as actions from '../../actions';

@Injectable()
export class SetOnlineEffects {
  readonly setOnline$ = createEffect(() => this._actions$.pipe(
    ofType(actions.setOnline),
    tap(a => {
      if (a.notify) {
        if (a.online) {
          this._toastr.info('Online');
        } else if (!a.online) {
          this._toastr.error('Offline');
        }
      }
    }),
  ), { dispatch: false });

  constructor(
    private readonly _actions$: Actions,
    private readonly _toastr: ToastrService,
  ) { }
}
