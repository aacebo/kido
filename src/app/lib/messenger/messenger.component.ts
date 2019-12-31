import { coerceNumberProperty } from '@angular/cdk/coercion';
import { CdkVirtualForOf, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import { MessageAction } from './message-action.enum';
import { IMessage } from './message.interface';

@Component({
  moduleId: module.id,
  exportAs: 'kidoMessenger',
  selector: 'kido-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss'],
  host: { class: 'kido-messenger' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MessengerComponent implements AfterViewInit {
  @Input() active?: string;
  @Input()
  get messages() { return this._messages; }
  set messages(v: IMessage[]) {
    this._messages = v || [];
  }
  private _messages: IMessage[] = [];

  @Input()
  get itemSize() { return this._itemSize; }
  set itemSize(v: number) {
    this._itemSize = coerceNumberProperty(v);
  }
  private _itemSize = 90;

  @Output() action = new EventEmitter<{ message: IMessage; action: MessageAction }>();

  @ViewChild(CdkVirtualScrollViewport, { static: false })
  readonly virtualScrollViewport: CdkVirtualScrollViewport;

  @ViewChild(CdkVirtualForOf, { static: false })
  readonly virtualForOf: CdkVirtualForOf<IMessage>;

  private _resizeTimer: NodeJS.Timer;

  constructor(private readonly _cdr: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this._scrollToBottom();

    this.virtualForOf.dataStream.subscribe(() => {
      setTimeout(() => this._scrollToBottom(), 0);
    });
  }

  @HostListener('window:resize')
  onResize() {
    if (this._resizeTimer) {
      clearTimeout(this._resizeTimer);
    }

    this._resizeTimer = setTimeout(() => {
      this.virtualScrollViewport.checkViewportSize();
      this._scrollToBottom();
    }, 200);
  }

  onAction(e: MessageAction, message: IMessage) {
    this.action.emit({
      message,
      action: e,
    });
  }

  private _scrollToBottom() {
    this.virtualScrollViewport.scrollTo({ bottom: 0 });
    this._cdr.markForCheck();
  }
}
