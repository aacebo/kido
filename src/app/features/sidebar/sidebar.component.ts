import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'kido-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  width = 200;

  onResize(e: number) {
    this.width += e;
  }
}
