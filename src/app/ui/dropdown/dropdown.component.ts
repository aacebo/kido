import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  moduleId: module.id,
  exportAs: 'kidoDropdown',
  selector: 'kido-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  host: {
    class: 'kido-dropdown',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent { }
