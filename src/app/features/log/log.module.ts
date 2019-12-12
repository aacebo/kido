import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElapseTimeModule } from '../../ui/elapse-time';
import * as components from './components';

const declarations = [
  components.LogCardComponent,
];

@NgModule({
  declarations,
  exports: declarations,
  imports: [CommonModule, ElapseTimeModule],
})
export class LogModule { }
