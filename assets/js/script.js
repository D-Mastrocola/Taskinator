let formEl = document.querySelector("#task-form");
let tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskEl = function (taskDataObj) {
  let listItemEl = document.createElement("li");
  listItemEl.className = "task-item";
  // create div to hold task info and add to list item
  var taskInfoEl = document.createElement("div");
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
  tasksToDoEl.appendChild(listItemEl);
};

let createTaskHandler = function (event) {
  //Prevents the browser from reloding on form submit
  event.preventDefault();

  let taskNameInput = document.querySelector("input[name='task-name']").value;
  let taskTypeInput = document.querySelector("select[name='task-type']").value;

    // check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
      }
    

  let taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput,
  };

  createTaskEl(taskDataObj);
  formEl.reset();
};

formEl.addEventListener("submit", createTaskHandler);
