import {
  Component,
  ChangeDetectionStrategy,
  ViewContainerRef,
  Inject,
  ComponentFactoryResolver,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { UNI_DIALOG_CONTENT } from '../../dialog-content.constant';

@Component({
  moduleId: module.id,
  selector: 'uni-dialog-container',
  exportAs: 'uniDialogContainer',
  templateUrl: './dialog-container.component.html',
  styleUrls: ['./dialog-container.component.scss'],
  host: {
    class: 'uni-dialog-container',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UniDialogContainerComponent implements AfterViewInit {
  @ViewChild('vc', { read: ViewContainerRef, static: false }) vc: ViewContainerRef;

  constructor(
    @Inject(UNI_DIALOG_CONTENT) private readonly _content: any,
    private readonly _resolver: ComponentFactoryResolver,
  ) {}

  ngAfterViewInit() {
    const factory = this._resolver.resolveComponentFactory(this._content);
    this.vc.clear();
    const ref = this.vc.createComponent(factory);
    ref.changeDetectorRef.detectChanges();
  }
}
