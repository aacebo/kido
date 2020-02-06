import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { UniSelectComponent } from './components/select/select.component';
import { UniOptionComponent } from './components/option/option.component';
import { UniSelectPanelComponent } from './components/select-panel/select-panel.component';

const declarations = [
  UniSelectComponent,
  UniOptionComponent,
  UniSelectPanelComponent,
];

@NgModule({
  declarations,
  exports: declarations,
  entryComponents: [UniSelectPanelComponent],
  imports: [CommonModule, OverlayModule],
})
export class UniSelectModule { }
