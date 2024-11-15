
//const ipcRenderer = require('electron').ipcRenderer;
//const fs = require('fs');
const h1 = document.querySelector("h1");
const close_button = document.querySelector("i#close");
const tasks_div = document.querySelector("#tasks");
const task_form = document.querySelector("#task_form");
const tasks = []
const task_prefab = document.querySelector("#task_prefab");
let last_task_id = 0;

const clamp = (val, min, max=val) => {
    return val > max ? max : val < min ? min : val;
}
const create_task = (task) => {
    console.log(task, 'tasksksksk');
    
    const new_task_div = document.createElement("div");
    new_task_div.classList.add('task');
    new_task_div.innerHTML = task_prefab.innerHTML;
    new_task_div.querySelector('.short_title').innerHTML = task.description;
    new_task_div.querySelector('.base_date').innerHTML = `Termin: ${task.deadline.toLocaleDateString()}`;
    let date_diff = task.deadline.getTime() - new Date().getTime();
    new_task_div.querySelector('.days_left').innerHTML = `Dni do końca: ${clamp(Math.round(date_diff / (1000 * 3600 * 24)), 0)}`;
    new_task_div.querySelector('#close').addEventListener('click', () => {close_task(task.id)});
    tasks_div.appendChild(new_task_div);
}

const close_task = (task_id) => { 
    const task = tasks.find(t => t.id === task_id);
    console.log(task_id, task);    
    task.finished = true;
    display_tasks(tasks);
    versions.save(tasks);
}

const display_tasks = (loaded_tasks, load = false) => {
    last_task_id = 0;
    tasks_div.innerHTML = '';
    loaded_tasks.forEach(task => {
        task.deadline = new Date(Date.parse(task.deadline));
        if(!task.finished) {
            create_task(task);
        }
        if(load)
            tasks.push(task);
        last_task_id+=1;
    });
}
window.onload = async () => {
    console.log('onload');
    const loaded_tasks = await versions.load();
    loaded_tasks.reverse();
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
    tasks.push({id: last_task_id, description: desc, deadline: new Date(Date.parse(deadline)), finished: false});
    console.log(desc, deadline);
    display_tasks(tasks);
    versions.save(tasks);
    
    
    
})