const taskListEl = document.getElementById("task-list");
const addButton = document.getElementById("add-btn");
const inputTaskEl = document.getElementById("input-task");
addButton.onclick = addTask;

let tasks = [
    {
        title: "Купить зимние ботинки",
        priority: "low",
        isCompleted: false,
    },
    {
        title: "Убраться дома",
        priority: "medium",
        isCompleted: true,
    },
    {
        title: "Поспать",
        priority: "high",
        isCompleted: false,
    }
];

tasks.forEach(task => createTaskElement(task));

function start() {
    console.log('Hello world');
    alert('111111111');
}

document.addEventListener('keydown',
    (ev) => {
        if (ev.key === 'Enter') {
            addTask();
        }
    })

function addTask() {
    const taskTitle = inputTaskEl.value;
    if (taskTitle) {

        inputTaskEl.value = null;
    }
}

function createTaskElement(task) {
    const newTaskEl = document.createElement('li');
    newTaskEl.classList.add("task-item");
    newTaskEl.classList.add("low-priority");

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
