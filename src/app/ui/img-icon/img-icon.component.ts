import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { coerceNumberProperty } from '@angular/cdk/coercion';

@Component({
  moduleId: module.id,
  exportAs: 'kidoImgIcon',
  selector: 'kido-img-icon',
  templateUrl: './img-icon.component.html',
  styleUrls: ['./img-icon.component.scss'],
  host: { class: 'kido-img-icon' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ImgIconComponent {
  @Input() src: string | SafeUrl;

  @Input()
  get width() { return this._width; }
  set width(w: number) {
    this._width = coerceNumberProperty(w);
  }
  private _width = 250;

  @Input()
  get height() { return this._height; }
  set height(h: number) {
    this._height = coerceNumberProperty(h);
  }
  private _height = 250;
}
