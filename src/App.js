import './App.css';
import { useState, useEffect } from 'react';
import { Button, ListGroup, InputGroup, FormControl } from 'react-bootstrap';

function App() {

  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    if(savedTodos) {return JSON.parse(savedTodos);}
    else return [];
  });
  const [todo, setTodo] = useState("");
  const [isEditing, setIsEditing] = useState(false);

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
        <InputGroup className="Input-style">
          <FormControl
            type="text" 
            name="todo" 
            placeholder="Create a new todo"
            value={todo}
            onChange={handleInputChange}
          />
          <Button variant="dark">ADD</Button>
        </InputGroup>
        <br/>
      </form>

      <ListGroup as="ul" className="todo-list">
        {todos.map((item) => (
          <ListGroup.Item as="li" key={item.id} font-size="30px">
            {item.text}
            {"  "}
            <Button variant="danger" onClick={() => handleDeleteClick(item.id)}> Delete </Button>
            <br/>
          </ListGroup.Item>
        ))}
      </ListGroup>

    </div>
  );
}

export default App;
