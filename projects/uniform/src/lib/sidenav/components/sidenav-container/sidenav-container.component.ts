import { Component, ChangeDetectionStrategy, ContentChild, Output, EventEmitter } from '@angular/core';

import { UniSidenavComponent } from '../sidenav/sidenav.component';
import { UniSidenavMode } from '../../enums/sidenav-mode.enum';

@Component({
  moduleId: module.id,
  selector: 'uni-sidenav-container',
  exportAs: 'uniSidenavContainer',
  templateUrl: './sidenav-container.component.html',
  styleUrls: ['./sidenav-container.component.scss'],
  host: {
    class: 'uni-sidenav-container',
  },
  changeDetection: ChangeDetectionStrategy.Default,
})
export class UniSidenavContainerComponent {
  @ContentChild(UniSidenavComponent, { static: true }) sidenav: UniSidenavComponent;
  @Output() backdropClicked = new EventEmitter<void>();

  get showBackdrop() {
    return this.sidenav.mode === UniSidenavMode.Over && this.sidenav.open;
  }
}
