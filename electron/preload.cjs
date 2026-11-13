const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('faxinaApp', { elevar: () => ipcRenderer.invoke('elevar') });
