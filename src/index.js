const electron = require('electron');
const dotenv = require('dotenv');

const update = require('./electron/update');
const extensions = require('./electron/extensions');
const window = require('./electron/window');

dotenv.config();

let mainWindow;

function createWindow() {
  extensions();
  update();

  mainWindow = window({
    width: 900,
    height: 600,
    minWidth: 600,
    minHeight: 600,
    title: 'Kido',
  });

  electron.ipcMain.on('open', (_, args) => {
    window({
      title: `Kido - ${args.title}`,
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
