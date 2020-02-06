import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  ElementRef,
  ContentChildren,
  QueryList,
  AfterContentInit,
  OnDestroy,
} from '@angular/core';
import { ConnectedPosition, CdkConnectedOverlay } from '@angular/cdk/overlay';
import { SelectionModel } from '@angular/cdk/collections';
import { BehaviorSubject, merge, Observable, Subject } from 'rxjs';
import { mergeMap, startWith, takeUntil } from 'rxjs/operators';

import { UniFormFieldControlBase, uniFormFieldProvider } from '../../../form-field';
import { IUniOptionSelectedEvent } from '../../interfaces/option-selected-event.interface';
import { UniOptionComponent } from '../option/option.component';
import { UniSelectPanelComponent } from '../select-panel/select-panel.component';

@Component({
  moduleId: module.id,
  selector: 'uni-select',
  exportAs: 'uniSelect',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [uniFormFieldProvider(UniSelectComponent)],
  host: {
    class: 'uni-select',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UniSelectComponent extends UniFormFieldControlBase<string> implements AfterContentInit, OnDestroy {
  @Input() panelClass = 'uni-select-panel';

  @ViewChild('trigger', { static: false }) trigger: ElementRef<HTMLElement>;
  @ViewChild(UniSelectPanelComponent, { static: false }) panel: UniSelectPanelComponent;
  @ViewChild(CdkConnectedOverlay, { static: false }) overlay: CdkConnectedOverlay;
  @ContentChildren(UniOptionComponent, { descendants: true }) options: QueryList<UniOptionComponent>;

  private readonly _destroy = new Subject<void>();

  selectionModel: SelectionModel<UniOptionComponent>;
  optionSelectionChanged: Observable<IUniOptionSelectedEvent>;
  readonly opened = new BehaviorSubject(false);
  readonly positions: ConnectedPosition[] = [
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'top',
    },
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'bottom',
    },
  ];

  get selected() {
    return this.selectionModel.selected.map(v => v.content).join(', ');
  }

  get minWidth() {
    return this.trigger ? this.trigger.nativeElement.clientWidth : 0;
  }

  ngAfterContentInit() {
    this.selectionModel = new SelectionModel<UniOptionComponent>(false);

    this.optionSelectionChanged = this.options.changes.pipe(
      startWith(this.options),
      mergeMap(() => merge<IUniOptionSelectedEvent>(...this.options.map(o => o.selectionChanged))),
    );

    this.optionSelectionChanged.pipe(takeUntil(this._destroy))
                               .subscribe(e => {
      if (e.source.selected) {
        this.select(e.source);
      }

      if (this.opened.value) {
        this.close();
      }
    });

    this.initOptions();
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }

  writeValue(value: string) {
    if (value !== this.value) {
      this.value = value;

      if (this.options) {
        this.initOptions();
      }
    }
  }

  toggle() {
    this.opened.next(!this.opened.value);
  }

  close() {
    this.opened.next(false);
  }

  private select(v: UniOptionComponent) {
    const options = this.options.toArray();

    this.selectionModel.select(v);
    this.value = this.optionValue(v);

    for (const option of options) {
      if (option !== v) {
        option.deselect();
      }
    }
  }

  private initOptions() {
    for (const option of this.options.toArray()) {
      const value = this.optionValue(option);

      if (!option.color) {
        option.color = this.uniFormField.color;
      }

      if (value === this.value) {
        option.select();
      }
    }
  }

  private optionValue(v: UniOptionComponent) {
    return v.value || v.content;
  }
}
