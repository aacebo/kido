import { Component, ChangeDetectionStrategy, Inject, forwardRef } from '@angular/core';

import { UniSidenavContainerComponent } from '../sidenav-container/sidenav-container.component';

@Component({
  moduleId: module.id,
  selector: 'uni-sidenav-content',
  exportAs: 'uniSidenavContent',
  templateUrl: './sidenav-content.component.html',
  styleUrls: ['./sidenav-content.component.scss'],
  host: {
    class: 'uni-sidenav-content',
    '[style.margin-left.px]': 'marginLeft',
    '[style.margin-right.px]': 'marginRight',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UniSidenavContentComponent {
  get marginLeft() {
    return this._open && this._position === 'start' && this._mode === 'side' ? this._width : 0;
  }

  get marginRight() {
    return this._open && this._position === 'end' && this._mode === 'side' ? this._width : 0;
  }

  private get _open() {
    return this._container.sidenav.open;
  }

  private get _mode() {
    return this._container.sidenav.mode;
  }

  private get _position() {
    return this._container.sidenav.position;
  }

  private get _width() {
    return +this._container.sidenav.el.nativeElement.clientWidth;
  }

  constructor(
    @Inject(forwardRef(() => UniSidenavContainerComponent))
    private readonly _container: UniSidenavContainerComponent,
  ) {}
}
