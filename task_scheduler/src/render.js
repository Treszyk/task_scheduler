
//const ipcRenderer = require('electron').ipcRenderer;
//const fs = require('fs');
const h1 = document.querySelector("h1");
const close_button = document.querySelector("i#close");
window.onload = async () => {
    console.log('onload');
    h1.innerHTML = await versions.save();
    //ipcRenderer.send('close');
}
//fs.writeFileSync('./test.txt', 'aaaa');
close_button.addEventListener("click", async () => {
    console.log();
    h1.innerHTML = await versions.save();
    //ipcRenderer.send('close');
})