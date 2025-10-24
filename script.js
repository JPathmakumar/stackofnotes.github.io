const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTask');
const taskList = document.getElementById('taskList');

// Load saved tasks
const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
savedTasks.forEach(task => addTaskToList(task.text, task.completed));

addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;
  addTaskToList(taskText, false);
  saveTasks();
  taskInput.value = '';
});

function addTaskToList(text, completed) {
  const li = document.createElement('li');
  li.textContent = text;
  if (completed) li.classList.add('completed');

  // Toggle completion when clicking the task text
  li.addEventListener('click', () => {
    li.classList.toggle('completed');
    saveTasks();
  });

  // --- Edit Button ---
  const editBtn = document.createElement('button');
  editBtn.textContent = '✎';
  editBtn.classList.add('edit-btn');
  editBtn.addEventListener('click', e => {
    e.stopPropagation();
    const newText = prompt('Edit your task:', li.childNodes[0].textContent);
    if (newText && newText.trim() !== '') {
      li.childNodes[0].textContent = newText.trim();
      saveTasks();
    }
  });

  // --- Delete Button ---
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '✖';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.addEventListener('click', e => {
    e.stopPropagation();
    li.remove();
    saveTasks();
  });

  // Add buttons to list item
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll('#taskList li').forEach(li => {
    tasks.push({
      text: li.childNodes[0].textContent,
      completed: li.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
