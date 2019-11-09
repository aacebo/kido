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
import 'codemirror/addon/lint/lint.js';
import 'codemirror/addon/fold/brace-fold.js';

import { FormControlBase, formControlProvider } from '../core/form-control';
import { NgForm, FormGroupDirective } from '@angular/forms';

@Component({
  moduleId: module.id,
  exportAs: 'kidoJsonEditor',
  selector: 'kido-json-editor',
  templateUrl: './json-editor.component.html',
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
      value: this.value,
      lint: true,
      tabSize: 2,
      foldGutter: true,
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
      viewportMargin: Infinity,
    });

    this.editor.on('change', this.onEditorChange.bind(this));
  }

  ngOnDestroy() {
    if (this.editor) {
      this.editor.off('change', this.onEditorChange.bind(this));
    }
  }

  private onEditorChange(editor: CodeMirror.EditorFromTextArea) {
    this.value = editor.getValue();
  }
}
