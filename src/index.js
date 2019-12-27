const electron = require('electron');
const dev = require('electron-is-dev');
const devtools = require('electron-devtools-installer');
const dotenv = require('dotenv');

const update = require('./electron/update');
const window = require('./electron/window');
const menu = require('./electron/menu');

dotenv.config({
  debug: dev,
  path: `${__dirname}/.env`,
});

let mainWindow;

function createWindow() {
  devtools.default(devtools.REDUX_DEVTOOLS);

  electron.session.defaultSession.webRequest.onHeadersReceived((details, cb) => {
    cb({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [
          'default-src \'self\'',
          'style-src \'self\' \'unsafe-inline\'',
          'script-src \'self\'',,
          'connect-src * data: blob: \'unsafe-inline\'',
        ]
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
