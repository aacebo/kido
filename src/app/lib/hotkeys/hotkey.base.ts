import { OnInit, OnDestroy } from '@angular/core';

/**
 * This is being used to fix issue when running --aot, where
 * lifecycle hooks are only called if they are explicitly declared.
 */
export class HotkeyBase implements OnInit, OnDestroy {
  ngOnInit() { }
  ngOnDestroy() { }
}
