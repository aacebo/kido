import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  moduleId: module.id,
  exportAs: 'kidoFullscreen',
  selector: '[kidoFullscreen]',
  templateUrl: './fullscreen.component.html',
  styleUrls: ['./fullscreen.component.scss'],
  host: {
    class: 'kido-fullscreen',
    '[class.kido-fullscreen--expanded]': 'fullscreen',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FullscreenComponent {
  @Input('kidoFullscreen')
  get fullscreen() { return this._fullscreen; }
  set fullscreen(v: boolean) {
    this._fullscreen = coerceBooleanProperty(v || false);
  }
  private _fullscreen?: boolean;
}
