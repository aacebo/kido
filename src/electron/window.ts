import * as path from 'path';
import * as electron from 'electron';
import * as dev from 'electron-is-dev';
import * as url from 'url';

function icon() {
  return process.platform === 'linux' ? 'png/512x512.png' : 'icns/512x512.icns';
}

const DEFAULT_OPTIONS: electron.BrowserWindowConstructorOptions = {
  autoHideMenuBar: true,
  darkTheme: true,
  show: false,
  frame: process.platform === 'darwin' ? false : true,
  titleBarStyle: process.platform === 'darwin' ? 'hidden' : 'default',
  icon: path.join(__dirname, '../assets/logo', icon()),
  backgroundColor: '#424242',
  webPreferences: {
    nodeIntegration: true,
    backgroundThrottling: false,
  },
};

export function window(
  options: Partial<electron.BrowserWindowConstructorOptions>,
  uri: string,
  onReady?: () => void,
) {
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

    if (onReady) {
      onReady();
    }
  });

  return win;
}
