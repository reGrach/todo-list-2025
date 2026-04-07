
function start() {
    console.log('Hello world');
    alert('111111111');
}

const taskListEl = document.getElementById("task-list");
const addButton = document.getElementById("add-btn");
const inputTaskEl = document.getElementById("input-task");
addButton.onclick = addTask;

function addTask() {
    const taskTitle = inputTaskEl.value;
    const newTaskEl = document.createElement('li');
    newTaskEl.classList.add("task-item");
    newTaskEl.classList.add("low-priority");

    newTaskEl.addEventListener('click', (ev) => {
        ev.currentTarget.classList.toggle('completed');
    });

    newTaskEl.innerHTML = `
    <span class="task-content">${taskTitle}</span>
    <div class="task-actons">
        <button class="task-btn" onclick="this.parentNode.parentNode.remove()">
            <span class="material-symbols-outlined">delete</span>
        </button>
    </div>`
    taskListEl.append(newTaskEl);
}



