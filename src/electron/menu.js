const { app, Menu } = require('electron');
const about = require('./about');

module.exports = function menu(mainWindow) {
  Menu.setApplicationMenu(Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        { label: 'About Kido', click: () => about(mainWindow) },
        { type: 'separator' },
        { label: 'Exit', click: () => app.quit() },
      ],
    },
    {
      label: 'View',
      submenu: [
        { label: 'Toggle Developer Tools', click: () => mainWindow.webContents.openDevTools() }
      ],
    },
  ]));
}
