import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';

import * as actions from '../../actions';
import { PouchService } from '../../../../core/services';
import { IStreamCollection } from '../../models';

@Injectable()
export class GetCollectionsEffects {
  private readonly _pouchService = new PouchService<IStreamCollection>('collection');

  readonly collections$ = createEffect(() => this._actions$.pipe(
    ofType(actions.getCollections),
    switchMap(() =>
      this._pouchService.get()
        .then(res => actions.getCollectionsSuccess({ collections: res.docs }))
        .catch(error => actions.getCollectionsFailed({ error })),
    ),
  ));

  constructor(private readonly _actions$: Actions) { }
}
