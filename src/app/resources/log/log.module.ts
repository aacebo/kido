import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers} from './log.state';
import * as effects from './effects';

@NgModule({
  imports: [
    StoreModule.forFeature('log', reducers),
    EffectsModule.forFeature([
      effects.AddEffects,
      effects.GetEffects,
    ]),
  ],
})
export class LogModule { }
