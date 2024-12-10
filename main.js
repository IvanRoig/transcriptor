const { app, BrowserWindow, ipcMain } = require('electron');
const { spawn } = require('child_process');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false, 
    },
    show: false, 
  });

  mainWindow.loadFile('index.html');

  mainWindow.once('ready-to-show', () => {
    mainWindow.maximize();
    mainWindow.show();
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.handle('transcribe-image', async () => {
  return new Promise((resolve) => {
    const pythonProcess = spawn('python', ['transcriber.py']);

    let output = '';
    let isResolved = false;

    pythonProcess.stdout.on('data', (data) => {
      output += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`Error del script Python: ${data}`);
    });

    pythonProcess.on('close', (code) => {
      if (isResolved) return;
      isResolved = true;

      try {
        const result = JSON.parse(output);
        resolve(result);
      } catch (error) {
        resolve({ success: false, error: "Error al procesar la salida del script Python." });
      }
    });

    setTimeout(() => {
      if (!isResolved) {
        pythonProcess.kill();
        resolve({ success: false, error: "Tiempo de espera agotado." });
      }
    }, 10000);
  });
});
