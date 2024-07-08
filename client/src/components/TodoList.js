import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await axios.get('http://localhost:5000/todos');
      setTodos(res.data);
    };
    fetchTodos();
  }, []);

  const addTodo = async (task) => {
    const res = await axios.post('http://localhost:5000/todos', { task });
    setTodos([...todos, res.data]);
  };

  const updateTodo = async (id, completed) => {
    const res = await axios.put(`http://localhost:5000/todos/${id}`, { completed });
    setTodos(todos.map(todo => (todo._id === id ? res.data : todo)));
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/todos/${id}`);
    setTodos(todos.filter(todo => todo._id !== id));
  };

  const alterTodo = async (id, updatedTask) => {
    try {
      const res = await axios.patch(`http://localhost:5000/todos/${id}`, { task: updatedTask });
      setTodos(todos.map(todo => (todo._id === id ? res.data : todo)));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const sortedTodos = [...todos].sort((a, b) => b.completed - a.completed);

  return (
    <div>
      <h1>To-Do List</h1>
      <AddTodo addTodo={addTodo} />
      <ul>
        {sortedTodos.map(todo => (
          <TodoItem key={todo._id} todo={todo} updateTodo={updateTodo} deleteTodo={deleteTodo} alterTodo={alterTodo} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
