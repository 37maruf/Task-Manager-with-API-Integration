// ============================================================
// TASK 2: Todo / Task Manager App
// Pattern: data array -> functions change the array -> render()
// ============================================================

// 1) DATA: one array holds all our tasks
let todos = [];
let nextId = 1;

// 2) DOM elements (we select them once, at the top)
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoError = document.getElementById("todo-error");
const todoList = document.getElementById("todo-list");
const countTotal = document.getElementById("count-total");
const countCompleted = document.getElementById("count-completed");
const countPending = document.getElementById("count-pending");

// 3) FUNCTIONS that change the data (they do NOT touch the DOM)
function addTask(title) {
  const newTask = {
    id: nextId,
    title: title,
    completed: false,
  };
  nextId++;
  todos.push(newTask);
}

function toggleTask(id) {
  const task = todos.find(function (t) { return t.id === id; });
  if (task) {
    task.completed = !task.completed; // true -> false, false -> true
  }
}

function deleteTask(id) {
  todos = todos.filter(function (t) { return t.id !== id; });
}

// 4) RENDER: the only function that updates the UI
function renderTodos() {
  todoList.innerHTML = ""; // clear old list

  todos.forEach(function (task) {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    // Checkbox to mark complete
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.dataset.id = task.id;
    checkbox.dataset.action = "toggle";

    // Task title
    const title = document.createElement("span");
    title.className = "title";
    title.textContent = task.title;

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.dataset.id = task.id;
    deleteBtn.dataset.action = "delete";

    li.append(checkbox, title, deleteBtn);
    todoList.appendChild(li);
  });

  // Update the counters
  const completedCount = todos.filter(function (t) { return t.completed; }).length;
  countTotal.textContent = todos.length;
  countCompleted.textContent = completedCount;
  countPending.textContent = todos.length - completedCount;
}

// 5) EVENTS
todoForm.addEventListener("submit", function (event) {
  event.preventDefault(); // stop page reload

  const title = todoInput.value.trim();

  // Bonus: do not allow empty tasks
  if (title === "") {
    todoError.textContent = "Please write something before adding a task.";
    return;
  }

  todoError.textContent = "";
  addTask(title);
  todoInput.value = "";
  renderTodos();
});

// One listener for the whole list (works for all current and future items)
todoList.addEventListener("click", function (event) {
  const action = event.target.dataset.action;
  const id = Number(event.target.dataset.id);

  if (action === "toggle") {
    toggleTask(id);
    renderTodos();
  } else if (action === "delete") {
    deleteTask(id);
    renderTodos();
  }
});

// Show the empty state on first load
renderTodos();
