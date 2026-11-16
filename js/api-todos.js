// ============================================================
// TASK 3 & 4: Fetch todos from API and render them
// ============================================================

const API_URL = "https://jsonplaceholder.typicode.com/todos";

// 1) DATA / STATE
let apiTodos = [];          // all todos from the API
let currentFilter = "all";  // "all" | "completed" | "pending"
let searchText = "";        // text typed in the search box

// 2) DOM elements
const apiList = document.getElementById("api-list");
const apiStatus = document.getElementById("api-status");
const apiCount = document.getElementById("api-count");
const filterButtons = document.querySelectorAll(".filter-btn");
const refreshBtn = document.getElementById("refresh-btn");
const searchInput = document.getElementById("search-input");

// 3) FETCH data (async/await + try/catch)
async function fetchTodos() {
  // Show loading message
  apiStatus.className = "status";
  apiStatus.textContent = "Loading todos...";
  apiList.innerHTML = "";
  apiCount.textContent = "";

  try {
    const response = await fetch(API_URL);

    // fetch() does not throw on 404/500, so we check manually
    if (!response.ok) {
      throw new Error("Server error: " + response.status);
    }

    apiTodos = await response.json(); // convert response to JSON
    apiStatus.textContent = ""; // hide loading message
    renderApiTodos();
  } catch (error) {
    apiStatus.className = "status error";
    apiStatus.textContent = "Failed to load todos. " + error.message;
  }
}

// 4) Get the todos that match the current filter + search
function getVisibleTodos() {
  return apiTodos.filter(function (todo) {
    // filter by status
    if (currentFilter === "completed" && !todo.completed) return false;
    if (currentFilter === "pending" && todo.completed) return false;

    // filter by search text
    return todo.title.toLowerCase().includes(searchText.toLowerCase());
  });
}

// 5) RENDER
function renderApiTodos() {
  const visible = getVisibleTodos();
  apiList.innerHTML = "";

  visible.forEach(function (todo) {
    const li = document.createElement("li");
    if (todo.completed) li.classList.add("completed");

    const id = document.createElement("strong");
    id.textContent = "#" + todo.id;

    const title = document.createElement("span");
    title.className = "title";
    title.textContent = todo.title;

    const badge = document.createElement("span");
    badge.className = "badge " + (todo.completed ? "done" : "pending");
    badge.textContent = todo.completed ? "Completed" : "Pending";

    li.append(id, title, badge);
    apiList.appendChild(li);
  });

  apiCount.textContent = "Showing " + visible.length + " of " + apiTodos.length + " todos";
}

// 6) EVENTS
filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    currentFilter = button.dataset.filter;

    // move the "active" style to the clicked button
    filterButtons.forEach(function (b) { b.classList.remove("active"); });
    button.classList.add("active");

    renderApiTodos();
  });
});

searchInput.addEventListener("input", function () {
  searchText = searchInput.value;
  renderApiTodos();
});

refreshBtn.addEventListener("click", fetchTodos);

// Load data when the page opens
fetchTodos();
