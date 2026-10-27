import React from 'react';

const Todo = ({ todo, deleteTodo, completeTodo }) => {
  return(
    <div className="todo">
      <span className="todo-content" style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
        {todo.text}
      </span>

      {
        completeTodo && (
          <button onClick={() => completeTodo(todo)}>Set as done</button>
        )
      }

      {
        deleteTodo && (
          <button onClick={() => deleteTodo(todo)}> Delete </button>
        )
      }
    </div>
  )
};

export default Todo;