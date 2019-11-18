import { NgModule } from '@angular/core';

import { ElapseTimePipe } from './elapse-time';
import { BytesToStringPipe } from './bytes-to-string';

const declarations = [
  ElapseTimePipe,
  BytesToStringPipe,
];

@NgModule({
  declarations,
  exports: declarations,
})
export class PipesModule { }
