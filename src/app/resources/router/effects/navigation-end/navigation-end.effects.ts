import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigatedAction } from '@ngrx/router-store';
import { tap } from 'rxjs/operators';

import { ElectronService } from '../../../../core/services';

@Injectable()
export class NavigationEndEffects {
  readonly navigationEnd$ = createEffect(() => this._actions$.pipe(
    ofType(routerNavigatedAction),
    tap(a => {
      this._electronService.send('ga.pageview', a.payload.event.urlAfterRedirects);
    }),
  ), { dispatch: false });

  constructor(
    private readonly _actions$: Actions,
    private readonly _electronService: ElectronService,
  ) { }
}
