import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UniIconService {
  private _prefix?: string;

  get prefix() {
    return this._prefix;
  }

  registry(prefix: string) {
    this._prefix = prefix;
  }
}
