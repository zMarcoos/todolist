const newTaskInput = document.querySelector('input.new-task-input');
const newTaskButton = document.querySelector('button.new-task-button');
const taskList = document.querySelector('ul.tasks');

document.addEventListener('click', (event) => {
  const element = event.target;
  if (element.classList.contains('new-task-button')) {
    createTask(newTaskInput.value);
    resetText();
  } else if (element.classList.contains('delete')) {
    deleteTask(element);
  }
});

newTaskInput.addEventListener('keypress', (event) => {
  if (event.keyCode === 13) {
    const task = newTaskInput.value;

    createTask(task);
    resetText();
  }
});

const resetText = () => {
  newTaskInput.value = '';
  newTaskInput.focus();
}

const createTask = (task) => {
  if (!task) return;

  const listItem = document.createElement('li');
  listItem.innerText = `${task} `;

  const deleteButton = document.createElement('button');
  deleteButton.setAttribute('class', 'delete');
  deleteButton.innerText = 'Apagar';

  listItem.appendChild(deleteButton);
  taskList.appendChild(listItem);

  saveTasks();
};

const deleteTask = (taskElement) => {
  taskElement.parentElement.remove();
  saveTasks();
}

const saveTasks = () => {
  const newTaskList = [];
  const tasksInList = taskList.querySelectorAll('li');

  for (let task of tasksInList) {
    const text = task.innerText.replace('Apagar', '').trim();
    newTaskList.push(text);
  }

  const tasksJSON = JSON.stringify(newTaskList);
  localStorage.setItem('tasks', tasksJSON);
}

const reloadTasks = () => {
  const savedTasks = localStorage.getItem('tasks');
  const tasks = JSON.parse(savedTasks);
  if (!tasks) return;

  for (let task of tasks) {
    createTask(task);
  }
}

reloadTasks();