let list = document.querySelector(".list");
let form = document.getElementById("form");
let input = document.getElementById("input");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let item = { text: input.value, completed: false };

  input.value = "";

  const div = document.createElement("div");
  div.classList.add("item");
  if (item.completed) div.classList.add("completed");
  div.textContent = item.text;
  list.appendChild(div);

  div.addEventListener("click", () => {
    if (item.completed) {
      div.classList.remove("completed");
      item.completed = false;
    } else {
      div.classList.add("completed");
      item.completed = true;
    }
  });

  div.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    div.remove();
  });
});
