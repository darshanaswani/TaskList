//Define UI variables

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


//load all the event listeneres through function calling

loadEventlisteners();

//load all event listeners through function definition
function loadEventlisteners(){
    //DOM load event
    document.addEventListener('DOMContentLoaded',getTasks);
    //Add task Event
    form.addEventListener('submit',addtask);
    //Remove task Event
    taskList.addEventListener('click',removeTask);
    //Clear task event
    clearBtn.addEventListener('click',clearTasks);
    //Filter tasks event
    filter.addEventListener('keyup',filterTasks);  
}

//Get tasks from Localstorage
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        const li = document.createElement('li');
    //Add class
    li.className = 'collection-item';
    //Create text node and append to li
    li.appendChild(document.createTextNode(task));

    //Create new link element
    const link = document.createElement('a');
    //Add class to the link element
    link.className = 'delete-item secondary-content';
    //Add icon html
    link.innerHTML = '<i class = "fa fa-remove"></i>';
    //append the link to li element
    li.appendChild(link);
    
    //append li to task-list;
    taskList.appendChild(li);
    })
}

function addtask(e)
{
    //Add task
    if(taskInput.value === '')
    {
        alert("Enter any task");
    }

    //create li element
    const li = document.createElement('li');
    //Add class
    li.className = 'collection-item';
    //Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));

    //Create new link element
    const link = document.createElement('a');
    //Add class to the link element
    link.className = 'delete-item secondary-content';
    //Add icon html
    link.innerHTML = '<i class = "fa fa-remove"></i>';
    //append the link to li element
    li.appendChild(link);
    
    //append li to task-list;
    taskList.appendChild(li);
    
    //Store task in Local Storage
    storeTaskInLocalStorage(taskInput.value);  

    //clear input
    taskInput.value = '';
    e.preventDefault();
}

function storeTaskInLocalStorage(task)
{
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks',JSON.stringify(tasks));
}


//Remove task 
function removeTask(e)
{
    if(e.target.parentElement.classList.contains('delete-item'))
    {
        if(confirm('Are you Sure?')){
        e.target.parentElement.parentElement.remove();

        //Remove tasks from local storage
        removeTasksFromLocalStorage(e.target.parentElement.parentElement);
    }
    }
}

//Remove Tasks from ls function def
function removeTasksFromLocalStorage(taskItem)
{
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task,index){
        if(taskItem.textContent === task){
            tasks.splice(index,1);
        }
    })

    localStorage.setItem('tasks',JSON.stringify(tasks));
}

//Clear tasks function
function clearTasks(e)
{
    // taskList.innerHTML = '';

    //faster
    while(taskList.firstChild)
    {
        taskList.removeChild(taskList.firstChild);
    }
    // https://jsperf.com/innerhtml-vs-removechild/47


    //Clear from the local storage
    clearLocalStorage();
}

function clearLocalStorage()
{
    localStorage.clear();
}


//filter tasks function
function filterTasks(e)
{
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1)
        {
            task.style.display = 'block';
        }
        else{
            task.style.display = 'none';
        }
    });
}

