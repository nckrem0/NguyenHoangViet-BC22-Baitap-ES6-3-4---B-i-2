import Todo from "./models/todo.js";
import TodoController from "./controllers/todoController.js";
const todoController = new TodoController();

//Create array for Task
let tasks = todoController.showListTodo();

//Selectors
const todoInput = document.querySelector("#newTask");
const addButton = document.querySelector("#addItem");
const todoList = document.querySelector("#todo");
const todoListCompleted = document.querySelector("#completed");
const sortAlphaDown = document.querySelector("#sort-down");
const sortAlphaUp = document.querySelector("#sort-up");
const sortCompleted = document.querySelector("#sort-completed");
const sortUncompleted = document.querySelector("#sort-all");


//event listener

addButton.addEventListener("click", addTodo);

todoList.addEventListener("click", completeOrRemoveTodo);

sortAlphaDown.addEventListener("click",() => {
    sortTodoList(tasks, "down")
})
sortAlphaUp.addEventListener("click", () => {
    sortTodoList(tasks, "up")
})
sortCompleted.addEventListener("click", () => {
    showListSortCompleted()
});
sortUncompleted.addEventListener("click", () => {
    showListSortUnCompleted()
});


const showTodoList = (todos) => {
    //clear DOM
    todoList.innerHTML = "";
    todoListCompleted.innerHTML = "";

    todos.forEach((todo) => {
        if(todo.status === 0)
        {
            todoList.appendChild(elementTodoUnComplete(todo));
        }
        else
        {
            todoListCompleted.appendChild(elementTodoCompleted(todo));
        }
    }); 
};
//show todo list
showTodoList(tasks);

function addTodo() {
    // Add todo to List; 
    if(todoInput.value.trim() != ""){
        const todo = new Todo();
        todo.id = new Date().getTime();
        todo.name = todoInput.value;
        todoController.addTodo(todo);

        //Show to HTML
        todoList.appendChild(elementTodoUnComplete(todo)); 

        //clear input
        todoInput.value = ""
    }
}


//completed or remove todo
function completeOrRemoveTodo(event){
    const target = event.target;
    const action_btn = target.parentElement.classList[0];
    const id = target.parentElement.id;
    switch (action_btn) {
        case "complete-btn":
            todoController.completedTodo(id);
            break;
        case "remove-btn":
            todoController.deleteTodo(id);
            break;
    }
    showTodoList(tasks);
}


//sort todo list
const sortTodoList = (list, typeSort) => {
    const listSort = todoController.sortTodoList(list, typeSort);
    showTodoList(listSort);
}

const showListSortCompleted = () =>{
    const listSort = todoController.showListTodoCompleted();
    showTodoList(listSort);
}
const showListSortUnCompleted = () =>{
    const listSort = todoController.showListTodoUnCompleted();
    showTodoList(listSort);
}



//element HTML
function elementTodoUnComplete(todo){
    const todoDiv = document.createElement("div");
    todoDiv.id = `todo-${todo.id}`;
    todoDiv.classList.add("task");
    
    const newTodo = document.createElement("li");
    newTodo.classList.add("task-name");
    newTodo.innerText = todo.name;
    todoDiv.appendChild(newTodo);
    
    const completeButton = document.createElement("button");
    completeButton.classList.add("complete-btn");
    completeButton.innerHTML = '<i class= "fas fa-check btn_complete"></i>';
    completeButton.id = todo.id;
    todoDiv.appendChild(completeButton);

    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-btn");
    removeButton.innerHTML = '<i class= "fas fa-trash"></i>';
    removeButton.id = todo.id;
    todoDiv.appendChild(removeButton);
   
    return todoDiv;
}

function elementTodoCompleted(todo){
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("task");
    
    const newTodo = document.createElement("li");
    newTodo.innerText = todo.name;
    todoDiv.appendChild(newTodo);
    
    const completeButton = document.createElement("button");
    completeButton.innerHTML = '<i class= "fas fa-check complete"></i>';
    todoDiv.appendChild(completeButton);

    return todoDiv;
}
