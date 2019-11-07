import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { IStream } from '../../resources/stream';

@Component({
  selector: 'kido-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  @Input() streams: IStream[] = [];

  width = 200;

  onResize(e: number) {
    this.width += e;
  }
}
