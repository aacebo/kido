import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as components from './components';

const declarations = [
  components.LogCardComponent,
];

@NgModule({
  declarations,
  exports: declarations,
  imports: [CommonModule],
})
export class LogModule { }
