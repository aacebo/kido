import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

import { DropdownComponent } from './dropdown.component';

@Component({
  moduleId: module.id,
  exportAs: 'kidoSplitDropdown',
  selector: 'kido-split-dropdown',
  templateUrl: './split-dropdown.component.html',
  styleUrls: ['./split-dropdown.component.scss'],
  host: { class: 'kido-split-dropdown' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SplitDropdownComponent extends DropdownComponent {}
