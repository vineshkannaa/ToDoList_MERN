import React, { useState } from 'react';

const TodoItem = ({ todo, updateTodo, deleteTodo, alterTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(todo.task);

  const handleSaveClick = async () => {
    await alterTodo(todo._id, editedTask);
    setIsEditing(false);
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => updateTodo(todo._id, !todo.completed)}
      />
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
          />
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          {todo.task}
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => deleteTodo(todo._id)}>Delete</button>
        </>
      )}
    </li>
  );
};

export default TodoItem;

