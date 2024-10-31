// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const ipcRenderer = require('electron').ipcRenderer;
const { contextBridge } = require('electron')


const save_file = async () => {    
    let value = null;
    await ipcRenderer.invoke('save').then(res => value = res);
    //console.log(value);
    return value;
}
const get_value = () => {
    return value;
}
ipcRenderer.on('save-reply', function(event, val) {
    value = val;
});
contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  close: () => ipcRenderer.send('close'),
  save: () => save_file(),
  get_value: get_value,
})
