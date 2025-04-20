import React from "react";

function TodoItem({ todo, onDelete, onToggle }) {
    return (
      <div style={{ marginBottom: "0.5rem" }}>
        <span
          style={{
            textDecoration: todo.done ? "line-through" : "none",
            cursor: "pointer",
          }}
          onClick={() => onToggle(todo.id, todo.done)}
        >
          {todo.title}
        </span>
        <button
          onClick={() => onDelete(todo.id)}
          style={{ marginLeft: "1rem" }}
        >
          削除
        </button>
      </div>
    );
  }
  
  export default TodoItem;
