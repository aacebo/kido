import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef,
  Optional,
  OnDestroy,
} from '@angular/core';

import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/lint/lint.js';
import 'codemirror/addon/fold/brace-fold.js';

import { FormControlBase, formControlProvider } from '../core/form-control';
import { NgForm, FormGroupDirective } from '@angular/forms';

@Component({
  moduleId: module.id,
  exportAs: 'kidoJsonEditor',
  selector: 'kido-json-editor',
  template: '<textarea #textarea></textarea>',
  styleUrls: ['./json-editor.component.scss'],
  host: { class: 'kido-json-editor' },
  providers: [formControlProvider(JsonEditorComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class JsonEditorComponent extends FormControlBase<string> implements AfterViewInit, OnDestroy {
  @ViewChild('textarea', { static: false })
  readonly textarea: ElementRef<HTMLTextAreaElement>;

  editor: CodeMirror.EditorFromTextArea;

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
      mode: 'application/json',
      readOnly: this.readonly,
      lint: true,
      tabSize: 2,
      foldGutter: true,
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
      viewportMargin: Infinity,
      autoCloseBrackets: true,
    });

    this.editor.on('change', this.onEditorChange.bind(this));
    this.editor.setValue(this.value || '');
  }

  ngOnDestroy() {
    if (this.editor) {
      this.editor.off('change', this.onEditorChange.bind(this));
    }
  }

  private onEditorChange(editor: CodeMirror.EditorFromTextArea) {
    const v = editor.getValue();

    if (v !== this.value) {
      this.value = v;
    }
  }
}
