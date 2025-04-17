import React, { useState } from "react";

function AddTodoForm({ onAdd }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(title);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "2rem" }}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="タスクのタイトル"
      />
      <button type="submit" style={{ marginLeft: "0.5rem" }}>
        追加
      </button>
    </form>
  );
}

export default AddTodoForm;
