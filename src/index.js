const electron = require('electron');
const dev = require('electron-is-dev');
const updater = require('electron-updater');
const log = require('electron-log');

const url = require('url');
const path = require('path');
const dotenv = require('dotenv');
const os = require('os');

dotenv.config();

let mainWindow;

function loadExtensions() {
  if (dev && process.env.REDUX_EXTENSION_LOCATION) {
    if (process.env.REDUX_EXTENSION_FORCE_RELOAD) {
      electron.BrowserWindow.removeDevToolsExtension('Redux DevTools');
    }

    electron.BrowserWindow.addDevToolsExtension(
      path.join(os.homedir(), process.env.REDUX_EXTENSION_LOCATION),
    );
  }
}

function getIcon() {
  return process.platform === 'linux' ? 'png/64x64.png' : 'icns/64x64.icns';
}

async function updates() {
  log.transports.file.level = dev ? 'debug' : 'info';
  updater.autoUpdater.logger = log;

  updater.autoUpdater.on('checking-for-update', () => {
    mainWindow.webContents.send('update--checking-for-update');
  });

  updater.autoUpdater.on('update-available', (...args) => {
    mainWindow.webContents.send('update--update-available', args);
  });

  updater.autoUpdater.on('update-not-available', (...args) => {
    mainWindow.webContents.send('update--update-not-available', args);
  });

  updater.autoUpdater.on('download-progress', (...args) => {
    mainWindow.webContents.send('update--download-progress', args);
  });

  updater.autoUpdater.on('update-downloaded', (...args) => {
    mainWindow.webContents.send('update--update-downloaded', args);
  });

  const res = await updater.autoUpdater.checkForUpdatesAndNotify();
  console.log(res);
}

function createWindow () {
  loadExtensions();

  mainWindow = new electron.BrowserWindow({
    width: 900,
    height: 600,
    minWidth: 600,
    minHeight: 600,
    show: false,
    autoHideMenuBar: true,
    darkTheme: true,
    title: 'Kido',
    frame: process.platform === 'darwin' ? false : true,
    titleBarStyle: process.platform === 'darwin' ? 'hidden' : 'default',
    icon: path.join(__dirname, 'assets/logo', getIcon()),
    backgroundColor: '#424242',
    webPreferences: {
      nodeIntegration: true,
      backgroundThrottling: false,
    },
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/index.html`),
      protocol: "file:",
      slashes: true,
    })
  );

  mainWindow.webContents.on('dom-ready', () => {
    mainWindow.show();
    updates();

    if (dev) {
      mainWindow.webContents.openDevTools();
    }

    mainWindow.webContents.send('system', {
      pid: process.pid,
      platform: process.platform,
    });
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
