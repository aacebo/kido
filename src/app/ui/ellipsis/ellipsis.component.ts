import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, OnInit } from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';

@Component({
  moduleId: module.id,
  exportAs: 'kidoEllipsis',
  selector: '[kidoEllipsis]',
  templateUrl: './ellipsis.component.html',
  styleUrls: ['./ellipsis.component.scss'],
  host: { class: 'kido-ellipsis' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class EllipsisComponent implements OnInit {
  @Input('kidoEllipsis') text: string;
  @Input('kidoEllipsisMaxLength')
  get maxLength() { return this._maxLength; }
  set maxLength(v: number) {
    this._maxLength = coerceNumberProperty(v);
  }
  private _maxLength = 300;

  content: string;
  expanded?: boolean;

  ngOnInit() {
    this.content = this.text;

    if (this.text.length > this.maxLength) {
      this.collapse();
    }
  }

  expand() {
    this.content = this.text;
    this.expanded = true;
  }

  collapse() {
    this.content = `${this.text.slice(0, this.maxLength)}`;
    this.expanded = false;
  }
}
