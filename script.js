//Varaibles
const form = document.querySelector(".form");
const itemList = document.querySelector(".bottomWrapper");
const filterList = document.querySelector(".filterContent");
const filterOptions = document.querySelectorAll(".filterContent li");
const clr = document.querySelector(".clearBtn");
const tasks = document.querySelector(".AddTask");
const items = JSON.parse(localStorage.getItem("Item")) || [];
let text;

//Functions
applyitems(items, itemList);

function addItems(e) {
  e.preventDefault();
  const input = tasks.value;
  const data = {
    text,
    completed: false,
  };
  data.text = input;

  items.push(data);
  applyitems(items, itemList);
  localStorage.setItem("Item", JSON.stringify(items));
  this.reset();
}

function applyitems(datas = [], datalist) {
  if (datas.length === 0) {
    // Show "No Task" when there are no items
    datalist.innerHTML = '<div class="none">No Task</div>';
    return;
  }
  datalist.innerHTML = datas
    .map((item, index) => {
      return `
    <div class="tasks">
         <span><input type="checkbox" class="pending" data-index=${index} name="Task${index}" id="Task${index}" ${
        item.completed ? "checked" : ""
      }> <label class="taskLabel ${
        item.completed ? "completed" : "pending"
      }" for="Task${index}">${item.text}</label> </span>
         <i class="fa-solid fa-trash accent " data-index=${index}></i>
      </div> `;
    })
    .join("");
}
function toggleStaus(e) {
  if (!e.target.matches("input")) return;
  const index = e.target.dataset.index;
  items[index].completed = !items[index].completed;
  localStorage.setItem("Item", JSON.stringify(items));
  applyitems(items, itemList);
}

function toggleClass(e) {
  if (!e.target.matches("label")) return;
  let classList = e.target.classList;
  if (classList.contains("completed")) {
    e.target.classList.remove("completed");
    e.target.classList.add("pending");
  } else if (classList.contains("pending")) {
    e.target.classList.remove("pending");
    e.target.classList.add("completed");
  }
}
function clearAll() {
  items.splice(0, items.length);
  localStorage.removeItem("Item");
  applyitems(items, itemList);
}

function deleteData(e) {
  const index = e.target.dataset.index;
  items.splice(index, 1);
  localStorage.setItem("Item", JSON.stringify(items));
  applyitems(items, itemList);
}

function filterItemsStyle(e) {
  if (!e.target.matches("li")) return;
  filterOptions.forEach((option) => {
    option.classList.remove("active");
  });
  e.target.classList.add("active");
  filterItem(e.target);
}
function filterItem(item) {
  if (item.innerHTML == "All") {
    applyitems(items, itemList);
  } else if (item.innerHTML == "Pending") {
    const filteredContent = items.filter((tasks) => !tasks.completed);
    applyitems(filteredContent, itemList);
  } else if (item.innerHTML == "Completed") {
    const filteredContent = items.filter((tasks) => tasks.completed);
    applyitems(filteredContent, itemList);
  }
}

//EventLisnteners
form.addEventListener("submit", addItems);
filterList.addEventListener("click", filterItemsStyle);
clr.addEventListener("click", clearAll);
//AI suggestion
itemList.addEventListener("click", (e) => {
  if (e.target.matches(".fa-trash")) {
    deleteData(e);
  } else if (e.target.matches("input[type='checkbox']")) {
    toggleStaus(e);
  } else if (e.target.matches("label")) {
    toggleClass(e);
  }
});
