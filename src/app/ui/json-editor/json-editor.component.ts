import { coerceBooleanProperty } from '@angular/cdk/coercion';
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

import CodeMirror from 'codemirror';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/fold/brace-fold.js';
import 'codemirror/addon/lint/lint.js';
import 'codemirror/mode/javascript/javascript.js';

import { FormControlBase, formControlProvider } from '../core/form-control';
import { isValidJSON } from '../../core/utils';

@Component({
  moduleId: module.id,
  exportAs: 'kidoJsonEditor',
  selector: 'kido-json-editor',
  templateUrl: './json-editor.component.html',
  styleUrls: ['./json-editor.component.scss'],
  host: {
    class: 'kido-json-editor',
    '[class.kido-json-editor--invalid]': 'invalid && !raw',
    '[class.kido-json-editor--focused]': 'focused',
  },
  providers: [formControlProvider(JsonEditorComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class JsonEditorComponent extends FormControlBase<string> implements AfterViewInit, OnDestroy {
  @Input()
  get raw() { return this._raw; }
  set raw(v: boolean) {
    this._raw = coerceBooleanProperty(v);

    if (this.editor) {
      this.editor.setOption('mode', this._mode);
    }
  }
  protected _raw?: boolean;

  get value() { return this._value; }
  set value(v: string) {
    this._value = v;

    if (this.editor && v !== this.editor.getValue()) {
      this.editor.setValue(v || '');
    }

    this.cdr.markForCheck();
    this.onChange(v);
  }
  protected _value?: string;

  @Output() rawChanged = new EventEmitter<boolean>();
  @Output() copyValue = new EventEmitter<string>();
  @Output() send = new EventEmitter<string>();

  @ViewChild('textarea', { static: false })
  readonly textarea: ElementRef<HTMLTextAreaElement>;

  editor: CodeMirror.EditorFromTextArea;
  invalid = false;
  focused = false;

  private get _mode() {
    return this._raw ? 'text/plain' : 'application/json';
  }

  constructor(
    readonly el: ElementRef<HTMLInputElement | HTMLTextAreaElement>,
    readonly cdr: ChangeDetectorRef,
    @Optional() readonly ngForm: NgForm,
    @Optional() readonly ngFormGroup: FormGroupDirective,
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
      viewportMargin: Infinity,
      autoCloseBrackets: true,
    });

    this.editor.on('change', this.onEditorChange.bind(this));
    this.editor.on('focus', this.onFocus.bind(this));
    this.editor.on('blur', (this.onFocus.bind(this)));
    this.editor.setValue(this.value || '');
  }

  ngOnDestroy() {
    if (this.editor) {
      this.editor.off('change', this.onEditorChange.bind(this));
    }
  }

  onCopy() {
    this.copyValue.emit(this.editor.getValue());
  }

  onBeautify() {
    if (!this.raw) {
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

  private onEditorChange(editor: CodeMirror.EditorFromTextArea) {
    const v = editor.getValue();
    this.invalid = !isValidJSON(v);

    if (v !== this.value) {
      this.value = v;
    }
  }

  private onFocus(editor: CodeMirror.EditorFromTextArea) {
    this.focused = editor.hasFocus();
    this.cdr.markForCheck();
  }
}
