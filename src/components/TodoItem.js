import React from "react";

function TodoItem({ todo, onDelete }) {
  return (
    <div style={{ marginBottom: "0.5rem" }}>
      {todo.title} {todo.done ? "✅" : "🕒"}
      <button onClick={() => onDelete(todo.id)} style={{ marginLeft: "1rem" }}>
        削除
      </button>
    </div>
  );
}

export default TodoItem;
