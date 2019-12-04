import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';

import { reducers } from './update.state';

@NgModule({
  imports: [
    StoreModule.forFeature('update', reducers),
  ],
})
export class UpdateModule { }
