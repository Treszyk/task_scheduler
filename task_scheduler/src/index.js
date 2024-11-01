const { app, BrowserWindow } = require('electron');
const path = require('node:path');
const fs = require('fs');
const ipcMain = require('electron').ipcMain;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    frame: false,
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  mainWindow.setMenuBarVisibility(false);
  mainWindow.webContents.openDevTools();
  mainWindow.once('ready-to-show', () => {
  mainWindow.show();
  })
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('close', () => {
  app.quit();
})

ipcMain.handle('save', async (event, tasks) => {
  //let test = [{id:0, description:'aaaa', deadline:'02/11/2024', finished: false}, {id:1, description:'bbbbb', deadline:'03/11/2024', finished: false}];
  console.log(tasks);
  fs.writeFileSync(app.getPath('userData') + "/tasks.json", JSON.stringify(tasks));
  return 'amogus';
})

ipcMain.handle('load', async (event) => {
  if(fs.existsSync(app.getPath('userData') + "/tasks.json")) {
    let tasks = JSON.parse(fs.readFileSync(app.getPath('userData') + "/tasks.json"));
    return tasks;
  } else {
    fs.writeFileSync(app.getPath('userData') + "/tasks.json", '');
    return [];
  }
})
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
