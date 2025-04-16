import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");

  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:3001/todo-app");
      setTodos(res.data);
    } catch (error) {
      console.error("読み込みエラー:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // ✅ タスク追加
  const addTodo = async () => {
    if (!newTitle.trim()) return;
    try {
      await axios.post("http://localhost:3001/todo-app", {
        title: newTitle,
        done: false, // 初期状態
      });
      setNewTitle("");
      fetchTodos();
    } catch (error) {
      console.error("追加エラー:", error);
    }
  };

  // ✅ タスク削除
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/todo-app/${id}`);
      fetchTodos();
    } catch (error) {
      console.error("削除エラー:", error);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>📋 ToDoリスト</h1>
      {todos.map((todo) => (
        <div key={todo.id} style={{ marginBottom: "0.5rem" }}>
          {todo.title} {todo.done ? "✅" : "🕒"}
          <button
            onClick={() => deleteTodo(todo.id)}
            style={{ marginLeft: "1rem" }}
          >
            削除
          </button>
        </div>
      ))}

      <div style={{ marginTop: "2rem" }}>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="タスクのタイトル"
        />
        <button onClick={addTodo} style={{ marginLeft: "0.5rem" }}>
          追加
        </button>
      </div>
    </div>
  );
}

export default App;
