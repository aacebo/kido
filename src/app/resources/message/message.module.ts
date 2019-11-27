import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import * as effects from './effects';
import { reducers } from './message.state';

@NgModule({
  imports: [
    StoreModule.forFeature('message', reducers),
    EffectsModule.forFeature([
      effects.GetEffects,
      effects.SendEffects,
      effects.RemoveAllEffects,
      effects.SaveEffects,
    ]),
  ],
})
export class MessageModule { }
