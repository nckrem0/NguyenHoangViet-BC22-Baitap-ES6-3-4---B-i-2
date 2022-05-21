import Todo from "../models/todo.js";
//base data
var todos = [
    {
        id: 1,
        name: "Do Homwork",
        status: 1
    },
    {
        id: 2,
        name: "Go to bed",
        status: 0
    },
    {
        id: 3,
        name: "Play game",
        status: 0
    }

]

class TodoController {
    showListTodo(){
        return todos;
    }
    addTodo(item){
        const todo = new Todo();
        todo.id = item.id;
        todo.name = item.name;
        todo.status = item.status || 0;
        
        todos.push(todo);
    }
    sortTodoList(list, typeSort){
        switch (typeSort) {
            case "down":
                list.sort((a,b) => a.name.localeCompare(b.name));
                break;
        
            default:
                list.sort((a,b) => b.name.localeCompare(a.name));
                break;
        }
        return list;
    }
    completedTodo(id){
        let completeTodo;
        todos.forEach((todo) => {
            if(parseInt(id) === todo.id){
                todo.status = 1;
                completeTodo = todo;
            }
        });
        return completeTodo;
    }
    deleteTodo(id){
        todos.forEach((todo, index) => {
            if(parseInt(id) === todo.id){
                todos.splice(index, 1);
            }
        });
        return todos;
    }
    showListTodoCompleted(){
        let listCompleted = todos.filter((todo) => {
            return todo.status === 1;
        });
        return listCompleted;
    }
    showListTodoUnCompleted(){
        let listUncompleted = todos.filter((todo) => {
            return todo.status === 0;
        });
        return listUncompleted;
    }
}
export default TodoController;