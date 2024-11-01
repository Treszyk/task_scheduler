// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const ipcRenderer = require('electron').ipcRenderer;
const { contextBridge } = require('electron')


const save_file = async (tasks) => {    
    let value = null;
    console.log('tasks in save_file preload', tasks);
    await ipcRenderer.invoke('save', tasks).then(res => value = res);
    return value;
}

const load_file = async () => {    
    let value = null;
    await ipcRenderer.invoke('load').then(res => value = res);
    //console.log(value);
    return value;
}

const get_value = () => {
    return value;
}

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  close: () => ipcRenderer.send('close'),
  save: (tasks) => save_file(tasks),
  load: () => load_file(),
  get_value: get_value,
})
