let listItems = [];
listItems =
  localStorage.length > 0 && JSON.parse(localStorage.getItem("todoList"));
const submitButton = document.querySelector(".submit-btn");
const inputBox = document.querySelector(".input-box");
const list = document.querySelector(".list");

listItem();
// keypress
inputBox.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    submitButton.click();
  }
});

// list items
function listItem() {
  if (localStorage.length === 0) return;
  const localStorageItems = JSON.parse(localStorage.getItem("todoList"));
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  localStorageItems.map((item) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.classList.add("delete-btn");
    btn.classList.add("btn");
    btn.innerHTML = '<i class="fa-solid fa-square-minus"></i>';
    li.classList.add("list-item");
    const textNode = document.createTextNode(item);
    li.appendChild(btn);
    li.appendChild(textNode);
    list.appendChild(li);
  });
}
function deleteBtn() {
  const deleteButton = document.querySelectorAll(".delete-btn");
  deleteButton.forEach((button) => {
    button.addEventListener("click", function (event) {
      const liItem = event.target.parentElement;
      let itemToBeDeleted = "";
      if (liItem.parentElement.classList.contains("list-item")) {
        liItem.parentElement.remove();
        itemToBeDeleted = liItem.parentElement.innerText;
      } else {
        liItem.remove();
        itemToBeDeleted = liItem.innerText;
      }
      const localStorageItems2 = JSON.parse(localStorage.getItem("todoList"));
      const newListItems = localStorageItems2.filter(
        (item) => item !== itemToBeDeleted
      );
      localStorage.setItem("todoList", JSON.stringify(newListItems));
    });
  });
}
// set item to Local Storage
submitButton.addEventListener("click", function (inputValue) {
  inputValue = inputBox.value;
  listItems.push(inputValue);
  window.localStorage.setItem("todoList", JSON.stringify(listItems));
  listItem();
  deleteBtn();
});
