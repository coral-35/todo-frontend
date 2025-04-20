// src/pages/Todo.js
import React, { useEffect, useState, useCallback } from "react";
import TodoList from "../components/TodoList";
import AddTodoForm from "../components/AddTodoForm";
import Logout from "../components/Logout";

function Todo({ session }) {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  const API_URL = process.env.REACT_APP_API_URL;
  const fetchTodos = useCallback(async () => {
    try {
      const res = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });
      
      console.log("Access Token:", session.accessToken);
      console.log("API URL:", API_URL);  // API_URLを確認

      const data = await res.json();
      console.log("取得したToDo:", data);  // 取得したデータを確認
      setTodos(data);
    } catch (error) {
      console.error("ToDoの取得に失敗:", error);
    }
  }, [session, API_URL]);

  const addTodo = async (title) => {
    if (!title.trim()) return;
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          title, 
          done: false,
          user_id: session.user.id,
        }),
      });
      fetchTodos();
    } catch (error) {
      console.error("ToDoの追加に失敗:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });
      fetchTodos();
    } catch (error) {
      console.error("ToDoの削除に失敗:", error);
    }
  };

  const toggleTodo = async (id, done) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ done: !done }),
      });
      fetchTodos();
    } catch (error) {
      console.error("ToDoの更新に失敗:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);
  

  const filteredTodos = todos.filter((todo) => {
    if (filter === "done") return todo.done;
    if (filter === "not-done") return !todo.done;
    return true;
  });

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h1>📋 ToDoリスト</h1>

      <div style={{ marginBottom: "1rem" }}>
        <button onClick={() => setFilter("all")}>すべて</button>
        <button onClick={() => setFilter("not-done")}>未完了</button>
        <button onClick={() => setFilter("done")}>完了</button>
      </div>

      <TodoList todos={filteredTodos} onDelete={deleteTodo} onToggle={toggleTodo} />
      <AddTodoForm onAdd={addTodo} />
      <Logout />
    </div>
  );
}

export default Todo;
