// alert('You successfully linked your JavaScript file!');

let todoItems = [];

/** Here are the to-do-list functions */

function renderTodo(todo) {
  localStorage.setItem('todoItemsRef', JSON.stringify(todoItems));
  // Select the first element with a class of `js-todo-list`
  const list = document.querySelector('.js-todo-list');
  // selct the current todo item in the DOM
  const item = document.querySelector(`[data-key='${todo.id}']`);

  // add this if block
  if (todo.deleted) {
    // remove the item from the DOM
    item.remove();
    // when todo itesm is empty//
    if (todoItems.length === 0) list.innerHTML = '';
    return;
  }

  // Use the ternary operator to check if `todo.checked` is true
  // if so, assign 'done' to `isChecked`. Otherwise, assign an empty string
  const isChecked = todo.checked ? 'done' : '';
  // Create an `li` element and assign it to `node`
  const node = document.createElement('li');
  // Set the class attribute
  node.setAttribute('class', `todo-item ${isChecked}`);
  // Set the data-key attribute to the id of the todo
  node.setAttribute('data-key', todo.id);
  // Set the contents of the `li` element created above
  node.innerHTML = `
      <input id="${todo.id}" type="checkbox"/>
      <label for="${todo.id}" class="tick js-tick"></label>
      <span>${todo.text}</span>
      <button class="delete-todo js-delete-todo">
      <svg><use href="#delete-icon"></use></svg>
      </button>
    `;

  if (item) {
    // replace
    list.replaceChild(node, item);
  } else {
    // otherwise append it o the end of the list
    list.append(node);
  }

  // Append the element to the DOM as the last child of
  // the element referenced by the `list` variable
}

// function to add todos to local storage
function addToLocalStorage(todo) {
  // conver the array to string then store it.
  localStorage.setItem('todo', JSON.stringify(todo));
  // render them to screen
  renderTodo(todo);
}

function addTodo(text) {
  const todo = {
    text,
    checked: false,
    id: Date.now(),
  };

  todoItems.push(todo);
  // renderTodo(todo);
  addToLocalStorage(todo);
}

function toggleDone(key) {
  // findIndex is an array method that returns the position of an element
  // in the array.
  const index = todoItems.findIndex((item) => item.id === Number(key));
  // Locate the todo item in the todoItems array and set its checked
  // property to the opposite. That means, `true` will become `false` and vice
  // versa.
  todoItems[index].checked = !todoItems[index].checked;
  renderTodo(todoItems[index]);
}

function deleteTodo(key) {
  // find the correspondig todo objcet in the todo array
  const index = todoItems.findIndex((item) => item.id === Number(key));
  // create a new object with properties of current todo iten
  // and an deletedt property which ist set to true
  const todo = {
    deleted: true,
    ...todoItems[index],
  };

  // remove toodo item from an array by filtering it out
  todoItems = todoItems.filter((item) => item.id !== Number(key));
  renderTodo(todo);
}

// select Form element//
const form = document.querySelector('.js-form');
// add sbmit event  listener
form.addEventListener('submit', (event) => {
  // prevent oage refrresh on submission
  event.preventDefault();
  // select the text input
  const input = document.querySelector('.js-todo-input');

  // Get the value of the input an remove whitespacees
  const text = input.value.trim();
  if (text !== '') {
    addTodo(text);
    input.value = '';
    input.focus();
  }
});

/** Here are the registered events */

// Select the entire list
const list = document.querySelector('.js-todo-list');
// Add a click event listener to the list and its children
list.addEventListener('click', (event) => {
  if (event.target.classList.contains('js-tick')) {
    const itemKey = event.target.parentElement.dataset.key;
    toggleDone(itemKey);
  }

  // add this if block
  if (event.target.classList.contains('js-delete-todo')) {
    const itemKey = event.target.parentElement.dataset.key;
    deleteTodo(itemKey);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const ref = localStorage.getItem('todoItemsRef');
  if (ref) {
    todoItems = JSON.parse(ref);
    todoItems.forEach((t) => {
      renderTodo(t);
    });
  }
});

// select the entire list
// const list = document.querySelector('.js-todo-list');
// ann a chlick event listener to the list and its children
// list.addEventListener('click', event => {
//  if (event.target.classList.contains('js-tick')) {
//    const itemKey = event.target.partentElement.dataset.key;
//  toggleDone(itemKey);
//  }
// });

// const todo = {
// text,
// checked: false,
// id: Date.now(),
// };

// todoItems.push(todo);
// console.log(todoItems);
