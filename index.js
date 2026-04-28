const keyStorage = 'task-list';
const taskStorage = {
    save: (tasks) => {
        const tasksAsStr = JSON.stringify(tasks);
        localStorage.setItem(keyStorage, tasksAsStr);
    },
    get: () => {
        const tasks = localStorage.getItem(keyStorage);
        return JSON.parse(tasks);
    },    
    init: () => {
        if (localStorage.getItem(keyStorage) === null) {
            taskStorage.save([]);
        }
    }
};

taskStorage.init();
const taskListEl = document.getElementById("task-list");
const addButton = document.getElementById("add-btn");
const inputTaskEl = document.getElementById("input-task");
addButton.onclick = addTask;

let tasks = taskStorage.get();
tasks.forEach(task => createTaskElement(task));

document.addEventListener('keydown',
    (ev) => {
        if (ev.key === 'Enter') {
            addTask();
        }
    })

function addTask() {
    const taskTitle = inputTaskEl.value;
    if (taskTitle) {

        const task = {
            title: taskTitle,
            isCompleted: false,
            priority: 'low'
        };

        createTaskElement(task);
        tasks.push(task);
        taskStorage.save(tasks);

        inputTaskEl.value = null;
    }
}

function createTaskElement(task) {
    const newTaskEl = document.createElement('li');
    newTaskEl.classList.add("task-item");
    newTaskEl.classList.add(`${task.priority}-priority`);

    if (task.isCompleted) {
        newTaskEl.classList.add('completed');
    }

    newTaskEl.addEventListener('click', (ev) => {
        ev.currentTarget.classList.toggle('completed');
    });

    newTaskEl.innerHTML = `
    <span class="task-content">${task.title}</span>
    <div class="task-actons">
        <button class="task-btn" onclick="this.parentNode.parentNode.remove()">
            <span class="material-symbols-outlined">delete</span>
        </button>
    </div>`
    taskListEl.append(newTaskEl);
}
