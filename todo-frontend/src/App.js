import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';


const API_URL = process.env.REACT_APP_BACKEND_URL;
const worker = new Worker('/taskCalculatorWorker.js')


function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [editId, setEditId] = useState(null);
  const [totalTasks, setTotalTasks] = useState(null);

  // Fetch todos from NestJS backend
  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_URL}/todos`);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);


  useEffect(() => {
    if (todos.length > 0) {
      worker.postMessage(todos);
    }
  }, [todos]);

  worker.onmessage = function (event) {
    console.log("Total tasks received from worker:", event.data);
    setTotalTasks(event.data);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    try {
      if (editId) {
        await axios.put(`${API_URL}/todos/${editId}`, { task });
        setEditId(null);
      } else {
        await axios.post(`${API_URL}/todos`, { task });
      }
      setTask('');
      fetchTodos(); // Refresh the list
    } catch (error) {
      console.error('Error saving todo:', error);
    }
  };


  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/todos/${id}`);
      fetchTodos(); // Refresh the list
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };


  const editTodo = (todo) => {
    setTask(todo.task);
    setEditId(todo.id);
  };


  return (
    <div className="App">
      <h1>Todo App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task"
        />
        <button type="submit">{editId ? 'Update' : 'Add'}</button>
      </form>

      <h2>Total Tasks: {totalTasks !== null ? totalTasks : "Loading..."}</h2>


      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span className="task-content">{todo.task}</span>
            <div className="buttons-container">
              <button className="edit-btn" onClick={() => editTodo(todo)}>
                Edit
              </button>
              <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;