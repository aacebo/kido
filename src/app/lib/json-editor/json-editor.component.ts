import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  Optional,
  ViewChild,
  ViewEncapsulation,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormGroupDirective, NgForm } from '@angular/forms';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import CodeMirror from 'codemirror';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/fold/brace-fold.js';
import 'codemirror/addon/lint/lint.js';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/addon/scroll/simplescrollbars.js';

import { FormControlBase, formControlProvider } from '../core/form-control';
import { isValidJSON } from '../../core/utils';
import { JsonEditorModalComponent } from './json-editor-modal.component';
import { IJsonEditorValue } from './json-editor-value.interface';

@Component({
  moduleId: module.id,
  exportAs: 'kidoJsonEditor',
  selector: 'kido-json-editor',
  templateUrl: './json-editor.component.html',
  styleUrls: ['./json-editor.component.scss'],
  host: {
    tabindex: '-1',
    class: 'kido-json-editor',
    '[class.kido-json-editor--invalid]': 'invalid && value.json',
    '(focus)': 'onFocus()',
    '(blur)': 'onBlur()',
  },
  providers: [formControlProvider(JsonEditorComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class JsonEditorComponent extends FormControlBase<IJsonEditorValue> implements AfterViewInit, OnDestroy {
  @Input() sendIcon = 'fa-paper-plane';
  @Input() sendTooltip = 'Send';

  @Input()
  get viewportMargin() { return this._viewportMargin; }
  set viewportMargin(v: number) {
    this._viewportMargin = coerceNumberProperty(v);
  }
  private _viewportMargin = Infinity;

  @Input()
  get sendable() { return this._sendable; }
  set sendable(v: boolean) {
    this._sendable = coerceBooleanProperty(v);
  }
  private _sendable?: boolean;

  @Input()
  get expandable() { return this._expandable; }
  set expandable(v: boolean) {
    this._expandable = coerceBooleanProperty(v);
  }
  private _expandable?: boolean;

  @Input()
  get copyable() { return this._copyable; }
  set copyable(v: boolean) {
    this._copyable = coerceBooleanProperty(v);
  }
  private _copyable?: boolean;

  get value() { return this._value; }
  set value(v: IJsonEditorValue) {
    this._value = v;

    if (this.editor && v && v.value !== this.editor.getValue()) {
      this.editor.setValue(v.value || '');
    }

    if (this.editor) {
      this.editor.setOption('mode', this._mode);
    }

    this.cdr.markForCheck();
    this.onChange(v);
  }
  protected _value?: IJsonEditorValue;

  @Output() copyValue = new EventEmitter<string>();
  @Output() send = new EventEmitter<string>();

  @ViewChild('textarea', { static: false })
  readonly textarea: ElementRef<HTMLTextAreaElement>;

  editor: CodeMirror.EditorFromTextArea;
  invalid = false;

  private get _mode() {
    return this.value && this.value.json ? 'application/json' : 'text/plain';
  }

  constructor(
    readonly el: ElementRef<HTMLElement>,
    readonly cdr: ChangeDetectorRef,
    @Optional() readonly ngForm: NgForm,
    @Optional() readonly ngFormGroup: FormGroupDirective,
    private readonly _modal: NgbModal,
  ) {
    super(el, cdr, ngForm, ngFormGroup);
  }

  ngAfterViewInit() {
    this.editor = CodeMirror.fromTextArea(this.textarea.nativeElement, {
      lineNumbers: true,
      theme: 'dracula',
      mode: this._mode,
      readOnly: this.readonly,
      lint: true,
      tabSize: 2,
      autofocus: true,
      foldGutter: true,
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
      viewportMargin: this._viewportMargin,
      autoCloseBrackets: true,
    });

    this.editor.on('change', this.onEditorChange.bind(this));
    this.editor.on('focus', this.onFocus.bind(this));
    this.editor.on('blur', this.onBlur.bind(this));
    this.editor.setValue(this.value && this.value.value ? this.value.value : '');
  }

  ngOnDestroy() {
    if (this.editor) {
      this.editor.off('change', this.onEditorChange.bind(this));
      this.editor.off('focus', this.onFocus.bind(this));
      this.editor.off('blur', this.onBlur.bind(this));
    }
  }

  onCopy() {
    this.copyValue.emit(this.editor.getValue());
  }

  onBeautify() {
    if (this.value.json) {
      const v = this.editor.getValue();
      this.invalid = !isValidJSON(v);

      if (!this.invalid) {
        this.editor.setValue(JSON.stringify(JSON.parse(v), undefined, 2));
      }
    }
  }

  onSend() {
    this.send.emit(this.editor.getValue());
  }

  onExpand() {
    const ref = this._modal.open(JsonEditorModalComponent, { size: 'xl' });
    ref.componentInstance.value = this.value;

    ref.result.then(v => {
      this.value = v;
    }, () => {});
  }

  onFocus() {
    this.el.nativeElement.classList.add('kido-json-editor--focused');
  }

  onBlur() {
    this.el.nativeElement.classList.remove('kido-json-editor--focused');
  }

  private onEditorChange(editor: CodeMirror.EditorFromTextArea) {
    const v = editor.getValue();
    this.invalid = !isValidJSON(v);

    if (v !== this.value.value) {
      this.value = {
        ...this.value,
        value: v,
      };
    }
  }
}
