import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { UniDialogContainerComponent } from './components/dialog-container/dialog-container.component';
import { UniDialogContentComponent } from './components/dialog-content/dialog-content.component';
import { UniDialogFooterComponent } from './components/dialog-footer/dialog-footer.component';
import { UniDialogHeaderComponent } from './components/dialog-header/dialog-header.component';
import { UniDialogTitleComponent } from './components/dialog-title/dialog-title.component';
import { UniDialogCloseDirective } from './directives/dialog-close/dialog-close.directive';
import { UniDialogService } from './dialog.service';

const declarations = [
  UniDialogContainerComponent,
  UniDialogContentComponent,
  UniDialogFooterComponent,
  UniDialogHeaderComponent,
  UniDialogTitleComponent,
  UniDialogCloseDirective,
];

@NgModule({
  declarations,
  exports: declarations,
  entryComponents: [UniDialogContainerComponent],
  imports: [CommonModule, OverlayModule],
  providers: [UniDialogService],
})
export class UniDialogModule { }
