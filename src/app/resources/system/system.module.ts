import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from './system.state';
import * as effects from './effects';

@NgModule({
  imports: [
    StoreModule.forFeature('system', reducers),
    EffectsModule.forFeature([
      effects.SetOnlineEffects,
    ]),
  ],
})
export class SystemModule { }
