const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todos");
const todoIcon = document.getElementById("todo-icon");
const developerInfoImage = document.querySelector("#developer-info img");
const todos = JSON.parse(localStorage.getItem('todos'));

//Set theme on refresh
const currentTheme = localStorage.getItem('todo-theme');
if(currentTheme) {
	if(currentTheme == 'dark') {
	document.documentElement.setAttribute('data-theme', 'dark');
	developerInfoImage.src = "assets/images/ajinkyacodes-white.png";
	} else if(currentTheme == 'light') {
	document.documentElement.setAttribute('data-theme', 'light');
	developerInfoImage.src = "assets/images/ajinkyacodes-black.png";
	}
} else {
	localStorage.setItem('todo-theme', 'light');
	document.documentElement.setAttribute('todo-theme', 'light');
	developerInfoImage.src = "assets/images/ajinkyacodes-black.png";
}

// Light/Dark Theme Setting
function switchTheme() {
	const theme = localStorage.getItem("todo-theme");
	if(theme !== null) {
		if(theme == "light") {
			developerInfoImage.src = "assets/images/ajinkyacodes-white.png";
			document.documentElement.setAttribute('data-theme', 'dark');
			localStorage.setItem('todo-theme', 'dark');
		} else if(theme == "dark") {
			developerInfoImage.src = "assets/images/ajinkyacodes-black.png";
			document.documentElement.setAttribute('data-theme', 'light');
			localStorage.setItem('todo-theme', 'light');
		}
	} 
}


if(todos) {
	todos.forEach(todo => addTodo(todo));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
});

function addTodo(todo) {
  let todoText = input.value;

  if (todo) {
    todoText = todo.text;
  }

  if (todoText) {
    const todoEl = document.createElement("li");
    if (todo && todo.completed) {
      todoEl.classList.add("completed");
    }
    todoEl.innerText = todoText;

		todoEl.addEventListener('click', () => {
			todoEl.classList.toggle('completed');
			updateLS();
		});
		
		todoEl.addEventListener('contextmenu', (e) => {
			e.preventDefault();
			todoEl.remove();
			updateLS();
		});

    todosUL.appendChild(todoEl);
    input.value = "";

		updateLS();
  }
}

function updateLS() {
	todosEl = document.querySelectorAll('li');

	const todos = [];

	todosEl.forEach(todoEl => {
		todos.push({
			text: todoEl.innerText,
			completed: todoEl.classList.contains('completed')
		})
	});

	localStorage.setItem('todos', JSON.stringify(todos));
}

// Event Listeners
todoIcon.addEventListener("click", switchTheme);