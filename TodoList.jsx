import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
  let [todos, setTodos] = useState([
    { task: "sample", id: uuidv4(), isDone: false },
  ]);

  let [newTodo, setNewTodo] = useState(""); //for adding a task
  let [searchTerm, setSearchTerm] = useState(""); //for searhing a task
  let [isEditing, setIsEditing] = useState(null); //to edit a taask
  let [editTodo, setEditTodo] = useState(""); //to edit a task

  //To add a new Task in list
  let addNewTask = () => {
    setTodos((prevTodo) => {
      return [...prevTodo, { task: newTodo, id: uuidv4(), isDone: false }]; //the new task will get an id due to uuidv4
    });
    setNewTodo(""); //calling setNewTodo
  };

  let delTodo = (id) => {
    setTodos(() => todos.filter((prevTodos) => prevTodos.id != id)); //task will be deleted based on id
  };

  let updateTask = (event) => {
    setNewTodo(event.target.value);
  }; //the value added in placeholder , triggers this function and re-renders the value

  let updateSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  let markAllDone = () => {
    setTodos(
      todos.map((todo) => {
        return {
          ...todo, //spreading an array so that new array is not created during delete
          isDone: true,
        };
      })
    );
    //console.log(newArr);
  };

  let markDone = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id == id) {
          return {
            ...todo, //same as markalldone
            isDone: true,
          };
        } else {
          return todo;
        }
      })
    );
  };

  let startEditing = (id, currTask) => {
    //currTeask => current task
    setIsEditing(id);
    setEditTodo(currTask);
  };

  let saveEdit = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id == id) {
          return {
            ...todo,
            task: editTodo,
          };
        } else {
          return todo;
        }
      })
    );
    setIsEditing(null);
    setEditTodo("");
  };

  let filteredTodos = todos.filter((todo) =>
    todo.task.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    //the re-rendered value in above functions updates value={newTodo}
    <div>
      <input placeholder="Add a Task" value={newTodo} onChange={updateTask} />
      <br /> <br />
      <button onClick={addNewTask}>Add Task</button>
      <br />
      <br />
      <hr />
      <input
        placeholder="Search Tasks"
        value={searchTerm}
        onChange={updateSearch}
      />
      <h4>Tasks To-Do</h4>
      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            {isEditing === todo.id ? (
              <input
                value={editTodo}
                onChange={(e) => setEditTodo(e.target.value)} //used e for edit
              />
            ) : (
              <span
                style={todo.isDone ? { textDecoration: "line-through" } : {}} //after task is done
              >
                {todo.task}
              </span>
            )}
            &nbsp;&nbsp;
            {isEditing === todo.id ? (
              <button onClick={() => saveEdit(todo.id)}>Save</button>
            ) : (
              <>
                <button onClick={() => delTodo(todo.id)}>Delete</button>
                <button onClick={() => markDone(todo.id)}>Done</button>
                <button onClick={() => startEditing(todo.id, todo.task)}>
                  Edit
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
      <div>
        <button onClick={markAllDone}>All Done</button>
      </div>
      <br />
      <br />
    </div>
  );
}
