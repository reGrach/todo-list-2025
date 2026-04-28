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

let TASKS = taskStorage.get();
TASKS.forEach(task => createTaskElement(task));

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
        TASKS.push(task);
        taskStorage.save(TASKS);

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
        task.isCompleted = !task.isCompleted;
        taskStorage.save(TASKS);
    });

    newTaskEl.innerHTML = `
    <span class="task-content">${task.title}</span>
    <div class="task-actons">
        <button class="task-btn">
            <span class="material-symbols-outlined">delete</span>
        </button>
    </div>`

    newTaskEl
        .querySelector('button.task-btn')
        .addEventListener('click', (ev) => {
            ev.currentTarget.parentNode.parentNode.remove();
            TASKS = TASKS.filter(x => x.title != task.title);
            taskStorage.save(TASKS);
        });

    taskListEl.append(newTaskEl);
}
