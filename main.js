const { app, BrowserWindow, screen } = require('electron')
const url = require('url');
const path = require('path');
const dev = require('electron-is-dev');
const dotenv = require('dotenv');
const os = require('os');

dotenv.config();

let mainWindow;

function createWindow () {
  if (dev && process.env.REDUX_EXTENSION_LOCATION) {
    BrowserWindow.addDevToolsExtension(
      path.join(os.homedir(), process.env.REDUX_EXTENSION_LOCATION),
    );
  }

  mainWindow = new BrowserWindow({
    width: screen.getPrimaryDisplay().bounds.width / 2,
    height: 600,
    show: false,
    autoHideMenuBar: true,
    darkTheme: true,
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
      slashes: true
    })
  );

  mainWindow.webContents.on('dom-ready', () => {
    mainWindow.show();
    mainWindow.webContents.openDevTools();

    mainWindow.webContents.send('system', {
      pid: process.pid,
      platform: process.platform
    });
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
