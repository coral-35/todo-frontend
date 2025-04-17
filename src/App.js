import React, { useEffect, useState } from "react";
import axios from "axios";
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";

function App() {
  const [todos, setTodos] = useState([]);

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

  const addTodo = async (title) => {
    if (!title.trim()) return;
    try {
      await axios.post("http://localhost:3001/todo-app", {
        title,
        done: false,
      });
      fetchTodos();
    } catch (error) {
      console.error("追加エラー:", error);
    }
  };

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
      <TodoList todos={todos} onDelete={deleteTodo} />
      <AddTodoForm onAdd={addTodo} />
    </div>
  );
}

export default App;
