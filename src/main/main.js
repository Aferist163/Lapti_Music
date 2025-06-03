const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow () {
  const win = new BrowserWindow({
    width: 1280,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  //win.setMenu(null);

  win.loadFile(path.join(__dirname, '../App/Ui/index.html'));
}

app.whenReady().then(createWindow);
