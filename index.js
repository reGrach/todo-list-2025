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
        <button class="task-btn btn-change-priority">
            <span class="material-symbols-outlined">arrow_shape_up_stack</span>
        </button>
        <button class="task-btn btn-edit">
            <span class="material-symbols-outlined">edit</span>
        </button>
        <button class="task-btn btn-delete">
            <span class="material-symbols-outlined">delete</span>
        </button>
    </div>`

    newTaskEl
        .querySelector('button.btn-delete')
        .addEventListener('click', (ev) => {
            ev.currentTarget.parentNode.parentNode.remove();
            TASKS = TASKS.filter(x => x.title != task.title);
            taskStorage.save(TASKS);
        });

    newTaskEl
        .querySelector('button.btn-change-priority')
        .addEventListener('click', (ev) => {
            ev.stopPropagation();
            ev.preventDefault();

            const el = ev.currentTarget.parentNode.parentNode;
            switch (task.priority) {
                case 'low':
                    task.priority = 'medium'
                    el.classList.remove('low-priority');
                    el.classList.add('medium-priority');
                    break;
                case 'medium':
                    task.priority = 'high'
                    el.classList.remove('medium-priority');
                    el.classList.add('high-priority');
                    break;
                default:
                    task.priority = 'low'
                    el.classList.remove('high-priority');
                    el.classList.add('low-priority');
                    break;
            }

            taskStorage.save(TASKS);
        });

    newTaskEl
        .querySelector('button.btn-edit')
        .addEventListener('click', (ev) => {
            ev.stopPropagation();
            ev.preventDefault();

            const newTitle = prompt('Изменить задачу', task.title);

            if (newTitle.trim()) {
                task.title = newTitle;

                ev.currentTarget
                    .parentNode
                    .parentNode
                    .querySelector('span.task-content')
                    .innerText = newTitle;
    
                taskStorage.save(TASKS);
            }
        });

    taskListEl.append(newTaskEl);
}
