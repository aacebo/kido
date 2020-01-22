import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotkeysModalComponent } from './hotkeys-modal.component';

@NgModule({
  declarations: [HotkeysModalComponent],
  entryComponents: [HotkeysModalComponent],
  imports: [CommonModule],
})
export class HotkeysModule { }
