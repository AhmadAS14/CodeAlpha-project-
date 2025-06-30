const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Render tasks on load
tasks.forEach(task => renderTask(task));

form.addEventListener("submit", function(e) {
  e.preventDefault();
  const text = input.value.trim();
  if (text !== "") {
    const newTask = { id: Date.now(), text, completed: false };
    tasks.push(newTask);
    renderTask(newTask);
    saveTasks();
    input.value = "";
  }
});

function renderTask(task) {
  const li = document.createElement("li");
  li.dataset.id = task.id;
  li.className = task.completed ? "completed" : "";

  const span = document.createElement("span");
  span.textContent = task.text;

  const actions = document.createElement("div");
  actions.className = "actions";

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "✔";
  completeBtn.addEventListener("click", () => toggleComplete(task.id));

  const editBtn = document.createElement("button");
  editBtn.textContent = "✏️";
  editBtn.addEventListener("click", () => editTask(task.id));

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑";
  deleteBtn.addEventListener("click", () => deleteTask(task.id));

  actions.appendChild(completeBtn);
  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  li.appendChild(span);
  li.appendChild(actions);

  taskList.appendChild(li);
}

function toggleComplete(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  updateUI();
  saveTasks();
}

function editTask(id) {
  const task = tasks.find(t => t.id === id);
  const newText = prompt("Edit task:", task.text);
  if (newText) {
    task.text = newText;
    updateUI();
    saveTasks();
  }
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  updateUI();
  saveTasks();
}

function updateUI() {
  taskList.innerHTML = "";
  tasks.forEach(task => renderTask(task));
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}