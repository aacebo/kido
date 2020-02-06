import { Component, ChangeDetectionStrategy, Input, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';

import { UniSidenavPosition } from '../../enums/sidenav-position.enum';
import { UniSidenavMode } from '../../enums/sidenav-mode.enum';
import { UniColor } from '../../../core/enums';
import { UNI_HOST_COLORS } from '../../../core/constants';

@Component({
  moduleId: module.id,
  selector: 'uni-sidenav',
  exportAs: 'uniSidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  host: {
    class: 'uni-sidenav',
    '[class.over]': 'mode === "over"',
    '[class.end]': 'position === "end"',
    '[class.closed]': 'open === false',
    ...UNI_HOST_COLORS,
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UniSidenavComponent {
  @Input() position = UniSidenavPosition.Start;
  @Input() mode = UniSidenavMode.Side;
  @Input() open = true;
  @Input() color?: UniColor;

  @Output() closed = new EventEmitter<void>();

  constructor(readonly el: ElementRef) {}

  @HostListener('document:keydown.escape')
  onEscape() {
    this.open = false;
    this.closed.emit();
  }
}
