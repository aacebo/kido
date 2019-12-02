import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule, routerReducer, RouterState } from '@ngrx/router-store';

@NgModule({
  imports: [
    StoreModule.forFeature('router', routerReducer),
    StoreRouterConnectingModule.forRoot({
      routerState: RouterState.Full,
    }),
  ],
})
export class RouterModule { }
