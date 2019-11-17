import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
  ViewChild,
  AfterViewInit,
  HostListener,
  Output,
  EventEmitter,
} from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

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
  @Input()
  get messages() { return this._messages; }
  set messages(v: IMessage[]) {
    this._messages = v || [];

    if (this.virtualScrollViewport && this._messages.length > 0) {
      this.onResize();
    }
  }
  private _messages: IMessage[] = [];

  @Input()
  get itemSize() { return this._itemSize; }
  set itemSize(v: number) {
    this._itemSize = coerceNumberProperty(v);
  }
  private _itemSize = 50;

  @Output() selected = new EventEmitter<IMessage>();

  @ViewChild(CdkVirtualScrollViewport, { static: false })
  readonly virtualScrollViewport: CdkVirtualScrollViewport;

  private _resizeTimer: NodeJS.Timer;

  ngAfterViewInit() { }

  @HostListener('window:resize')
  onResize() {
    if (this._resizeTimer) {
      clearTimeout(this._resizeTimer);
    }

    this._resizeTimer = setTimeout(() => {
      this.virtualScrollViewport.checkViewportSize();
      this._scrollToBottom();
    }, 100);
  }

  onClick(message: IMessage) {
    this.selected.emit(message);
  }

  private _scrollToBottom() {
    this.virtualScrollViewport.scrollToIndex(this._messages.length);
  }
}
