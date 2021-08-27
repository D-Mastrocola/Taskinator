let buttonEl = document.querySelector("#save-task");
console.log(buttonEl);

function addTask() {
    let taskItemEl = document.createElement("li");
    taskItemEl.textContent = "New Task";
    taskItemEl.className = "task-item";

    let tasksToDoEl = document.querySelector("#tasks-to-do");
    tasksToDoEl.appendChild(taskItemEl);
}

buttonEl.addEventListener("click", addTask);
