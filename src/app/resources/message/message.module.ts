import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from './message.state';
import * as effects from './effects';

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
