import { NgModule } from '@angular/core';

import { BytesToStringPipe } from './bytes-to-string';
import { ElapseTimePipe } from './elapse-time';

const declarations = [
  ElapseTimePipe,
  BytesToStringPipe,
];

@NgModule({
  declarations,
  exports: declarations,
})
export class PipesModule { }
