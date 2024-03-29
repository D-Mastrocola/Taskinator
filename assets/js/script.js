let taskIdCounter = 0;
let formEl = document.querySelector("#task-form");
let tasksToDoEl = document.querySelector("#tasks-to-do");
let pageContentEl = document.querySelector("#page-content");
let tasksInProgressEl = document.querySelector("#tasks-in-progress");
let tasksCompletedEl = document.querySelector("#tasks-completed");
let tasks = [];

//creates task text
let createTaskEl = function (taskDataObj) {
  let listItemEl = document.createElement("li");
  listItemEl.className = "task-item";

  // add task id as a custom attribute
  listItemEl.setAttribute("data-task-id", taskIdCounter);

  // create div to hold task info and add to list item
  let taskInfoEl = document.createElement("div");
  // give it a class name
  taskInfoEl.className = "task-info";
  // add HTML content to div
  taskInfoEl.innerHTML =
    "<h3 class='task-name'>" +
    taskDataObj.name +
    "</h3><span class='task-type'>" +
    taskDataObj.type +
    "</span>";

  listItemEl.appendChild(taskInfoEl);

  let taskActionEl = createTaskActions(taskIdCounter);
  listItemEl.appendChild(taskActionEl);

  let statusValue = taskDataObj.status;
  if (statusValue === "to do") {
    listItemEl.querySelector("select[name='status-change']").selectedIndex = 0;
    tasksToDoEl.appendChild(listItemEl);
  } else if (statusValue === "in progress") {
    listItemEl.querySelector("select[name='status-change']").selectedIndex = 1;
    tasksInProgressEl.appendChild(listItemEl);
  } else if (statusValue === "completed") {
    listItemEl.querySelector("select[name='status-change']").selectedIndex = 2;
    tasksCompletedEl.appendChild(listItemEl);
  }

  //increment counter
  taskIdCounter++;
};

//Creates task buttons and dropdown
let createTaskActions = function (taskId) {
  let actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

  // create edit button
  let editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(editButtonEl);

  // create delete button
  let deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(deleteButtonEl);

  // create task options
  let statusSelectEl = document.createElement("select");
  statusSelectEl.className = "select-status";
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);

  let statusChoices = ["To Do", "In Progress", "Completed"];

  for (let i = 0; i < statusChoices.length; i++) {
    // create option element
    let statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute("value", statusChoices[i]);

    // append to select
    statusSelectEl.appendChild(statusOptionEl);
  }

  actionContainerEl.appendChild(statusSelectEl);

  return actionContainerEl;
};
//Creates task element
let createTaskHandler = function (event) {
  let isEdit = formEl.hasAttribute("data-task-id");

  //Prevents the browser from reloding on form submit
  event.preventDefault();

  let taskNameInput = document.querySelector("input[name='task-name']").value;
  let taskTypeInput = document.querySelector("select[name='task-type']").value;

  // has data attribute, so get task id and call function to complete edit process
  if (isEdit) {
    var taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId);
  } else {
    // check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
      alert("You need to fill out the task form!");
      return false;
    }

    let taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput,
      status: "to do",
      id: taskIdCounter,
    };

    tasks.push(taskDataObj);
    saveTasks();
    createTaskEl(taskDataObj);
  }

  formEl.reset();
};

let completeEditTask = function (taskName, taskType, taskId) {
  // find the matching task list item
  let taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );

  // set new values
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType;

  alert("Task Updated!");

  formEl.removeAttribute("data-task-id");
  document.querySelector("#save-task").textContent = "Add Task";
};

//When main element is clicked the functions checks to see if task form states have been changed
let taskButtonHandler = function (event) {
  let targetEl = event.target;
  // edit button was clicked
  if (targetEl.matches(".edit-btn")) {
    let taskId = targetEl.getAttribute("data-task-id");
    editTask(taskId);
  }
  //delete task
  else if (targetEl.matches(".delete-btn")) {
    // get the element's task id
    let taskId = targetEl.getAttribute("data-task-id");
    deleteTask(taskId);
  }
};
let editTask = function (taskId) {
  // get task list item element
  let taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );

  //get content from task selected
  let taskName = taskSelected.querySelector("h3.task-name").textContent;
  document.querySelector("input[name='task-name']").value = taskName;

  let taskType = taskSelected.querySelector("span.task-type").textContent;
  document.querySelector("select[name='task-type']").value = taskType;

  document.querySelector("#save-task").textContent = "Save Task";

  formEl.setAttribute("data-task-id", taskId);

  saveTasks();

};

//handles deleting task element from the DOM
let deleteTask = function (taskId) {
  let taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
      tasks.splice(i, 1);
    }
  }

  taskSelected.remove();
  saveTasks();

};

let taskStatusChangeHandler = function (event) {
  // get the task item's id
  let taskId = event.target.getAttribute("data-task-id");

  // get the currently selected option's value and convert to lowercase
  let statusValue = event.target.value.toLowerCase();

  // find the parent task item element based on the id
  let taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );

  if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
  } else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);
  } else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected);
  }
  console.log(taskId);
  for (var i = 0; i < tasks.length; i++) {
    console.log(tasks[i].id === parseInt(taskId))
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].status = statusValue;
      console.log(tasks[i].status)
    }
  }
  saveTasks();
};

let saveTasks = function () {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  console.log('saved' );
  console.log(tasks);
};

let loadTasks = function () {
  let savedTasks = JSON.parse(localStorage.getItem("tasks"));
  console.log(savedTasks);
  if (savedTasks) {
    for (var i = 0; i < savedTasks.length; i++) {
      // pass each task object into the `createTaskEl()` function
      tasks.push(savedTasks[i]);
      createTaskEl(savedTasks[i]);
    }
  }
};
loadTasks();


formEl.addEventListener("submit", createTaskHandler);
pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);
