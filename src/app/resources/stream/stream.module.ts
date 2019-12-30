import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import * as effects from './effects';
import { reducers } from './stream.state';

@NgModule({
  imports: [
    StoreModule.forFeature('stream', reducers),
    EffectsModule.forFeature([
      effects.GetEffects,
      effects.AddEffects,
      effects.UpdateEffects,
      effects.ConnectEffects,
      effects.DisconnectEffects,
      effects.RemoveEffects,
    ]),
  ],
})
export class StreamModule { }
