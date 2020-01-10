import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { IStream } from '../../../../resources/stream';

@Component({
  selector: 'kido-stream-detail-sidebar',
  templateUrl: './stream-detail-sidebar.component.html',
  styleUrls: ['./stream-detail-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StreamDetailSidebarComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() stream: IStream;
  @Input() eventable?: boolean;

  @Input()
  get open() { return this._open; }
  set open(v: boolean) {
    this._open = coerceBooleanProperty(v);
  }
  private _open?: boolean;

  width = 150;

  constructor(private readonly _cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.form.get('listeners').setValue((this.stream.listeners || []).map(l => ({ ...l })));
    this.form.get('listeners').markAsPristine();
    this.form.valueChanges.subscribe(() => this._cdr.markForCheck());
  }

  onResize(e: number) {
    this.width += e;
  }
}
