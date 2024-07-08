import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';

const TodoPlaceHolder = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get('https://jsonplaceholder.typicode.com/todos');
        setTodos(res.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
    fetchTodos();
  }, []);

  const addTodo = async (task) => {
    try {
      const res = await axios.post('https://jsonplaceholder.typicode.com/todos', { title: task, completed: false });
      setTodos([...todos, res.data]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const updateTodo = async (id, completed) => {
    try {
      const res = await axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, { completed });
      setTodos(todos.map(todo => (todo.id === id ? res.data : todo)));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const alterTodo = async (id, updatedTask) => {
    try {
      const res = await axios.patch(`https://jsonplaceholder.typicode.com/todos/${id}`, { title: updatedTask });
      setTodos(todos.map(todo => (todo.id === id ? res.data : todo)));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <AddTodo addTodo={addTodo} />
      <ul>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
            alterTodo={alterTodo}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoPlaceHolder;
