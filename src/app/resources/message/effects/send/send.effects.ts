import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import { SocketService } from '../../../stream/services/socket';
import * as actions from '../../actions';

@Injectable()
export class SendEffects {
  readonly send$ = createEffect(() => this._actions$.pipe(
    ofType(actions.send),
    tap(a => this._socketService.send(a.streamId, a.args, a.event)),
  ), { dispatch: false });

  constructor(
    private readonly _actions$: Actions,
    private readonly _socketService: SocketService,
  ) { }
}
