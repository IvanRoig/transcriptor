const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  transcribeImage: () => ipcRenderer.invoke('transcribe-image'),
});
