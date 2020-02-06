import { Directive, Input, OnInit, ElementRef, TemplateRef } from '@angular/core';
import { OverlayRef, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { UniPosition, getUniPosition } from '../core/position';
import { UniTooltipComponent } from './tooltip.component';

@Directive({
  selector: '[uniTooltip]',
  exportAs: 'uniTooltip',
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
  },
})
export class UniTooltipDirective implements OnInit {
  @Input('uniTooltip') content: string | TemplateRef<any>;
  @Input('uniTooltipDisabled') disabled = false;
  @Input('uniTooltipPosition') position = UniPosition.Top;
  @Input('uniTooltipPanelClass') panelClass = 'uni-tooltip-panel';
  @Input('uniTooltipOrigin') origin: HTMLElement;

  private _overlayRef: OverlayRef;

  private get _vertical() {
    return this.position === UniPosition.Top ||
           this.position === UniPosition.Bottom;
  }

  private get _positionStrategy() {
    return this._overlay
               .position()
               .flexibleConnectedTo(this.origin || this._el)
               .withFlexibleDimensions(true)
               .withPush(this._vertical ? true : false)
               .withViewportMargin(8)
               .withPositions([getUniPosition(this.position)]);
  }

  constructor(
    private readonly _overlay: Overlay,
    private readonly _el: ElementRef,
  ) {}

  ngOnInit() {
    const positionStrategy = this._positionStrategy;
    this._overlayRef = this._overlay.create({
      positionStrategy,
      panelClass: this.panelClass,
    });
  }

  onMouseEnter() {
    if (!this.disabled && !this._overlayRef.hasAttached()) {
      this._overlayRef.updatePositionStrategy(this._positionStrategy);
      const portal = new ComponentPortal(UniTooltipComponent);
      const ref = this._overlayRef.attach(portal);
      ref.instance.content = this.content;
      ref.instance.position = this.position;
    }
  }

  onMouseLeave() {
    this._overlayRef.detach();
  }
}
