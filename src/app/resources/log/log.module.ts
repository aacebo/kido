import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { reducers} from './log.state';

@NgModule({
  imports: [
    StoreModule.forFeature('log', reducers),
  ],
})
export class LogModule { }
