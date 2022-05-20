//Selectors
const todoInput = document.querySelector('#newTask');
const todoButton = document.querySelector('#addItem');
const todoList = document.querySelector('#todo');

//Event Listener
todoButton.addEventListener('click',addTodo) ;
todoList.addEventListener('click',deleteCheck);

//Function
function addTodo(event) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("test");
    //create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item')
    todoDiv.appendChild(newTodo);

    //check mark button
    const completedButton = document.createElement('button') ;
    completedButton.innerHTML = '<i class= "fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //check trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class= "fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //Append to list
    todoList.appendChild(todoDiv)

    //clear input value
    todoInput.value = "";
};

function deleteCheck(event) {
    const item = event.target ;

    // Delete Todo
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        todo.remove();
    }

    // Check Mark
    if (item.classList[0]=== "complete-btn") {
        const todo =item.parentElement;
        todo.classList.toggle("completed");
    }
}
