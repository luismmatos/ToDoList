import { useEffect, useState } from "react";
import { NewToDoForm } from "./NewToDoForm";
import { ToDoList } from "./ToDoList";
import "./styles.css"

export default function App(){ 
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("todos")
    if (localValue == null) return []
    return JSON.parse(localValue)
  }) 

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  function addTodo(title) {
    setTodos(currentTodos => {
      return [
        ...currentTodos,
        {id: crypto.randomUUID(), title, completed: false},
      ]
    })
  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed}
        }

        return todo
      })
    })
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  return (
  <>
    <NewToDoForm onSubmit={addTodo} />
    <h1 className="header">To-Do List</h1>
    <ToDoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
  </>
  );
}