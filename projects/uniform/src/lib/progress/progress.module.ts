import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UniProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { UniProgressSpinnerComponent } from './components/progress-spinner/progress-spinner.component';

const declarations = [
  UniProgressBarComponent,
  UniProgressSpinnerComponent,
];

@NgModule({
  declarations,
  exports: declarations,
  imports: [CommonModule],
})
export class UniProgressModule { }
