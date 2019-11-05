import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'kido-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  host: {
    class: 'navbar',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent { }
