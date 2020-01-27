import { Component, ChangeDetectionStrategy, Input, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { StreamType, IStream } from '../../../../resources/stream';
import { Hotkeys, HotkeyBase } from '../../../../lib/hotkeys';

import { STREAM_TYPE_LABELS } from '../../constants';

@Component({
  selector: 'kido-stream-detail-header',
  templateUrl: './stream-detail-header.component.html',
  styleUrls: ['./stream-detail-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StreamDetailHeaderComponent extends HotkeyBase implements OnInit {
  @Input() form: FormGroup;
  @Input() connected: { [streamId: string]: Date } = { };
  @Input() connecting: { [streamId: string]: boolean } = { };

  @Input()
  get stream() { return this._stream; }
  set stream(v: IStream) {
    this._stream = v;

    if (this.form) {
      this.form.reset(this._formStream);
      this.form.markAsPristine();
    }
  }
  private _stream: IStream;

  @Output() save = new EventEmitter<void>();
  @Output() connect = new EventEmitter<void>();
  @Output() disconnect = new EventEmitter<void>();

  readonly STREAM_TYPE_LABELS = STREAM_TYPE_LABELS;
  readonly StreamType = StreamType;

  readonly nameExpanded$ = new BehaviorSubject(false);
  readonly editName$ = new BehaviorSubject(false);
  readonly editDescription$ = new BehaviorSubject(false);

  private get _formStream() {
    return {
      name: this.stream.name,
      description: this.stream.description,
      type: this.stream.type,
      url: this.stream.url,
      event: this.stream.event,
      args: (this.stream.args || []).map(a => ({ ...a })),
      listeners: (this.stream.listeners || []).map(l => ({ ...l })),
    } as Partial<IStream>;
  }

  private get _args() {
    return this.form.get('args') as FormArray;
  }

  constructor(
    private readonly _cdr: ChangeDetectorRef,
    private readonly _fb: FormBuilder,
  ) { super(); }

  ngOnInit() {
    this.form.get('type').setValue(this.stream.type);
    this.form.get('url').setValue(this.stream.url);
    this.form.valueChanges.subscribe(() => this._cdr.markForCheck());
  }

  @Hotkeys('mod+s', 'Save')
  onSave() {
    this.save.emit();
    this.editName$.next(false);
    this.editDescription$.next(false);
  }

  @Hotkeys('mod+r', 'Revert')
  onReset() {
    this.form.reset(this._formStream);

    this._args.clear();
    for (const arg of this.stream.args) {
      this._args.push(this._fb.control({ ...arg }));
    }

    this.form.markAsPristine();
    this.editName$.next(false);
    this.editDescription$.next(false);
  }

  @Hotkeys('mod+c', 'Connect')
  onConnect() {
    const connected = !!this.connected[this.stream._id];

    if (connected) {
      this.disconnect.emit();
    } else {
      this.connect.emit();
    }
  }

  toggleName() {
    this.nameExpanded$.next(!this.nameExpanded$.value);
  }

  editName(e: Event) {
    e.preventDefault();
    e.stopImmediatePropagation();

    this.editName$.next(true);
    this.editDescription$.next(false);
  }

  editDescription() {
    this.editName$.next(false);
    this.editDescription$.next(true);
  }
}
