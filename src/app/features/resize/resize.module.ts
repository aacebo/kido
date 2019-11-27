import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import * as components from './components';

const declarations = [
  components.HorizontalResizeBarComponent,
];

@NgModule({
  declarations,
  exports: declarations,
  imports: [CommonModule],
})
export class ResizeModule { }
