import * as electron from 'electron';
import dev from 'electron-is-dev';
import * as devtools from 'electron-devtools-installer';
import * as dotenv from 'dotenv';

import { update } from './update';
import { window } from './window';
import { menu } from './menu';

dotenv.config({
  debug: dev,
  path: `${__dirname}/.env`,
});

let mainWindow: electron.BrowserWindow;

function createWindow() {
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

  mainWindow = window({
    width: 900,
    height: 600,
    minWidth: 600,
    minHeight: 600,
    title: 'Kido',
  }, undefined, () => {
    menu(mainWindow);
    update(mainWindow);
  });

  electron.ipcMain.on('open', (_, args) => {
    window({
      parent: mainWindow,
      modal: args.modal,
    }, args.path);
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

electron.app.on('ready', createWindow);

electron.app.on('window-all-closed', () => {
  electron.app.quit();
});

electron.app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
