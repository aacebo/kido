import { NgZone } from '@angular/core';
import * as Mousetrap from 'mousetrap';

import { IHotkey } from './hotkey.interface';

export class HotkeysService {
  private static _instance: HotkeysService;
  static get instance() {
    if (!this._instance) {
      this._instance = new HotkeysService();
    }

    return this._instance;
  }

  get hotkeys() { return this._hotkeys; }
  private readonly _hotkeys: { [keys: string]: IHotkey } = { };
  private readonly _mousetrap = Mousetrap(document as never as Element);

  private constructor() {
    this._mousetrap.stopCallback = (..._: any) => {
      return false;
    };
  }

  register(keys: string, description: string, cb: () => void, zone: NgZone) {
    this._hotkeys[keys] = {
      keys,
      description,
      cb,
    };

    this._mousetrap.bind(keys, () => {
      zone.run(() => cb());
    });
  }

  deregister(keys: string) {
    this._hotkeys[keys] = undefined;
    delete this._hotkeys[keys];
    this._mousetrap.unbind(keys);
  }
}
