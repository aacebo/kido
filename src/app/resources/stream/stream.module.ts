import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from './stream.state';
import * as effects from './effects';

@NgModule({
  imports: [
    StoreModule.forFeature('stream', reducers),
    EffectsModule.forFeature([
      effects.GetCollectionsEffects,
      effects.GetStreamsEffects,
      effects.GetMessagesEffects,
    ]),
  ],
})
export class StreamModule { }
