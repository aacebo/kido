import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UniSidenavComponent } from './components/sidenav/sidenav.component';
import { UniSidenavContainerComponent } from './components/sidenav-container/sidenav-container.component';
import { UniSidenavContentComponent } from './components/sidenav-content/sidenav-content.component';

@NgModule({
  declarations: [UniSidenavComponent, UniSidenavContainerComponent, UniSidenavContentComponent],
  exports: [UniSidenavComponent, UniSidenavContainerComponent, UniSidenavContentComponent],
  imports: [CommonModule],
})
export class UniSidenavModule {}
