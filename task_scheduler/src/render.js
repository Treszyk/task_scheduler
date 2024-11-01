
//const ipcRenderer = require('electron').ipcRenderer;
//const fs = require('fs');
const h1 = document.querySelector("h1");
const close_button = document.querySelector("i#close");
const tasks_div = document.querySelector("#tasks");
const task_form = document.querySelector("#task_form");
const tasks = []
let last_task_id = 0;
const display_tasks = (loaded_tasks, load = false) => {
    last_task_id = 0;
    tasks_div.innerHTML = '';
    loaded_tasks.forEach(task => {
        if(!task.finished) {
            const task_div = document.createElement("div.task");
            task_div.innerHTML = `${task.id} | ${task.description} | ${task.deadline} | ${task.finished}`;
            tasks_div.appendChild(task_div);
            if(load)
                tasks.push(task);   
        }
        last_task_id+=1;
    });
}
window.onload = async () => {
    console.log('onload');
    const loaded_tasks = await versions.load();
    //h1.innerHTML = tasks;
    console.log(loaded_tasks);
    display_tasks(loaded_tasks, load=true);
    
    //ipcRenderer.send('close');
}
//fs.writeFileSync('./test.txt', 'aaaa');
close_button.addEventListener("click", async () => {
    console.log();
    versions.save(tasks);
    //h1.innerHTML = await versions.save();
    versions.close();
})

task_form.addEventListener('submit', (e) => {
    e.preventDefault();
    let desc = e.target.desc.value
    let deadline = e.target.deadline.value
    if(desc == '' || deadline == '')
    {
        alert('Zadne pole nie moze byc puste');
        return;
    }
    tasks.push({id: last_task_id, description: desc, deadline: deadline, finished: false});
    console.log(desc, deadline);
    display_tasks(tasks);
    versions.save(tasks);
    
    
    
})