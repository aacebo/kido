import * as electron from 'electron';
import * as devtools from 'electron-devtools-installer';
import * as dotenv from 'dotenv';
import * as dev from 'electron-is-dev';
import * as ua from 'universal-analytics';

import { KidoUpdater } from './updater';
import { window } from './window';
import { KidoMenu } from './menu';

(global as any).ua = ua;
dotenv.config({
  debug: dev,
  path: `${__dirname}/../.env`,
});

let app: App;

class App {
  private _updater: KidoUpdater;
  private _menu: KidoMenu;
  private _window: electron.BrowserWindow;

  constructor() {
    this._window = window({
      width: 900,
      height: 600,
      minWidth: 600,
      minHeight: 600,
      title: 'Kido',
    }, undefined, () => {
      this._menu = new KidoMenu(this._window);
      this._updater = new KidoUpdater(this._window);

      this._menu.checkForUpdate$.subscribe(() => {
        this._updater.check(true);
      });
    });

    electron.ipcMain.on('open', (_, args) => {
      window({
        parent: this._window,
        modal: args.modal,
      }, args.path);
    });

    this._window.on('closed', () => {
      this._window = null;
    });
  }

  quit() {
    electron.app.quit();
  }
}

electron.app.on('ready', () => {
  devtools.default(devtools.REDUX_DEVTOOLS);
  electron.session.defaultSession.webRequest.onHeadersReceived((details, cb) => {
    cb({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [
          'default-src \'self\'',
          'style-src \'self\' \'unsafe-inline\'',
          'script-src \'self\'',
          'connect-src * data: blob: \'unsafe-inline\'',
        ],
      },
    });
  });

  app = new App();
});

electron.app.on('window-all-closed', () => {
  app.quit();
});

electron.app.on('activate', () => {
  if (!app) {
    app = new App();
  }
});
