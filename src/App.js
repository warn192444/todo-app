import './App.css';
import { useState, useEffect } from 'react';

function App() {

  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    if(savedTodos) {return JSON.parse(savedTodos);}
    else return [];
  });
  const [todo, setTodo] = useState("");

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  })

  function handleInputChange(e) {
    setTodo(e.target.value);
  }

  function handleFormSubmit(e) {

    e.preventDefault();

    if(todo !== ""){
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          text: todo.trim()
        }
      ])
    }

    setTodo("");
  }

  function handleDeleteClick(id) {
    const removeItem = todos.filter((todo) => {
      return todo.id !== id
    })

    setTodos(removeItem);
  }

  console.log(todos);

  return (
    <div className="App">
      <h1>TODO List</h1>

      <form onSubmit={handleFormSubmit}>
        <input 
          type="text" 
          name="todo" 
          placeholder="Create a new todo"
          value={todo}
          onChange={handleInputChange}
        />
      </form>

      <ul className="todo-list">
        {todos.map((item) => (
          <li key={item.id}>
            {item.text}
            {"  "}
            <button onClick={() => handleDeleteClick(item.id)}> delete </button>
            <br/>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default App;
