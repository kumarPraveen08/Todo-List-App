let list = document.querySelector(".list");
let form = document.getElementById("form");
let input = document.getElementById("input");
let todos = JSON.parse(localStorage.getItem("todos")) || [];

if (todos.length > 0) {
  todos.forEach((todo) => {
    appendItem(todo);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (input.value.length > 0) {
    let todo = { text: input.value, completed: false };

    todos.push(todo);
    storeItem(todos);

    input.value = "";

    appendItem(todo);
  }
});

function appendItem(todo) {
  const item = document.createElement("div");
  item.classList.add("item");
  if (todo.completed) item.classList.add("completed");
  item.textContent = todo.text;
  list.appendChild(item);

  listStatus(item, todo);
  removeItem(item, todo);
}

function listStatus(item, todo) {
  item.addEventListener("click", () => {
    if (todo.completed) {
      item.classList.remove("completed");
      todo.completed = false;
      updateComplete(todo, false);
    } else {
      item.classList.add("completed");
      todo.completed = true;
      updateComplete(todo, true);
    }
  });
}

function updateComplete(todo, status) {
  let index = todos.indexOf(todo);
  todos[index].completed = status;
  storeItem(todos);
}

function storeItem(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeItem(item, todo) {
  item.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    item.remove();
    todos = todos.filter((t) => t !== todo);
    storeItem(todos);
  });
}
