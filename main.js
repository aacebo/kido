const electron = require('electron')
const url = require('url');
const path = require('path');
const dev = require('electron-is-dev');
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

function createWindow () {
  loadExtensions();

  mainWindow = new electron.BrowserWindow({
    width: electron.screen.getPrimaryDisplay().bounds.width / 2,
    height: 600,
    show: false,
    autoHideMenuBar: true,
    darkTheme: true,
    title: 'Koda',
    frame: process.platform === 'darwin' ? false : true,
    titleBarStyle: process.platform === 'darwin' ? 'hidden' : 'default',
    backgroundColor: '#424242',
    webPreferences: {
      nodeIntegration: true,
      backgroundThrottling: false,
    },
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/index.html`),
      protocol: "file:",
      slashes: true,
    })
  );

  mainWindow.webContents.on('dom-ready', () => {
    mainWindow.show();
    mainWindow.webContents.openDevTools();

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
