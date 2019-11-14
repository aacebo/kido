import { NgModule } from '@angular/core';

import { ElapseTimePipe } from './elapse-time';

const declarations = [
  ElapseTimePipe,
];

@NgModule({
  declarations,
  exports: declarations,
})
export class PipesModule { }
