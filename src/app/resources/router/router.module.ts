import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, routerReducer, RouterState } from '@ngrx/router-store';

import * as effects from './effects';

@NgModule({
  imports: [
    StoreModule.forFeature('router', routerReducer),
    EffectsModule.forFeature([effects.NavigationEndEffects]),
    StoreRouterConnectingModule.forRoot({
      routerState: RouterState.Full,
    }),
  ],
})
export class RouterModule { }
