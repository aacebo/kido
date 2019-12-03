const path = require('path');
const electron = require('electron');
const dev = require('electron-is-dev');
const url = require('url');

function icon() {
  return process.platform === 'linux' ? 'png/64x64.png' : 'icns/64x64.icns';
}

const DEFAULT_OPTIONS = {
  autoHideMenuBar: true,
  darkTheme: true,
  show: false,
  frame: process.platform === 'darwin' ? false : true,
  titleBarStyle: process.platform === 'darwin' ? 'hidden' : 'default',
  icon: path.join(__dirname, 'assets/logo', icon()),
  backgroundColor: '#424242',
  webPreferences: {
    nodeIntegration: true,
    backgroundThrottling: false,
  },
};

module.exports = function window(options, uri) {
  const win = new electron.BrowserWindow({
    ...DEFAULT_OPTIONS,
    ...options,
  });

  win.loadURL(url.format({
    pathname: path.join(__dirname, '../index.html'),
    protocol: 'file:',
    slashes: true,
    hash: uri,
  }));

  if (dev) {
    win.webContents.openDevTools();
  }

  win.webContents.on('dom-ready', () => {
    win.show();

    win.webContents.send('system', {
      pid: process.pid,
      platform: process.platform,
      version: electron.app.getVersion(),
      build: dev ? 'development' : 'production',
    });
  });

  return win;
}
