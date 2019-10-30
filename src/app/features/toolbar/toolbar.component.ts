import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'kido-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  host: {
    class: 'navbar navbar-dark bg-dark',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent { }
