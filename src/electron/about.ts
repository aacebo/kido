import { dialog, app, BrowserWindow } from 'electron';
import dev from 'electron-is-dev';

export function about(parent: BrowserWindow) {
  dialog.showMessageBox(parent, {
    message: 'About Kido',
    detail: `${app.getVersion()} (${dev ? 'development' : 'production'})`,
  });
}
