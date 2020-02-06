import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, ElementRef } from '@angular/core';

import { IUniOptionSelectedEvent } from '../../interfaces/option-selected-event.interface';
import { UniColor } from '../../../core/enums';
import { UNI_HOST_COLORS } from '../../../core/constants';

@Component({
  moduleId: module.id,
  selector: 'uni-option',
  exportAs: 'uniOption',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
  host: {
    class: 'uni-option',
    ...UNI_HOST_COLORS,
    '[class.disabled]': 'disabled',
    '[class.selected]': 'selected',
    '(click)': 'select()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UniOptionComponent {
  @Input() value?: any;
  @Input() color?: UniColor;
  @Input() disabled = false;
  @Input() selected = false;

  @Output() selectionChanged = new EventEmitter<IUniOptionSelectedEvent>();

  get content() {
    return this._el.nativeElement.textContent.trim();
  }

  constructor(private readonly _el: ElementRef<HTMLElement>) {}

  select() {
    if (!this.disabled && !this.selected) {
      this.selected = true;
      this._emitChanged();
    }
  }

  deselect() {
    if (!this.disabled && this.selected) {
      this.selected = false;
      this._emitChanged();
    }
  }

  private _emitChanged() {
    this.selectionChanged.emit({ source: this });
  }
}
