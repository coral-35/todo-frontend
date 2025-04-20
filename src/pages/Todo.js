// src/pages/Todo.js
import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import TodoList from "../components/TodoList";
import AddTodoForm from "../components/AddTodoForm";
import Logout from "../components/Logout";
function Todo() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  // ToDo一覧をSupabaseから取得
  const fetchTodos = async () => {
    try {
      const { data, error } = await supabase.from("todos").select("*");
      if (error) throw error;
      setTodos(data);
    } catch (error) {
      console.error("データの取得に失敗しました:", error);
    }
  };

  // 最初にデータを取得
  useEffect(() => {
    fetchTodos();
  }, []);

  // 新しいToDoをSupabaseに追加
  const addTodo = async (title) => {
    if (!title.trim()) return;
    const { error } = await supabase
      .from("todos")
      .insert([{ title, done: false }]);

    if (error) {
      console.error("ToDoの追加に失敗しました:", error);
    } else {
      fetchTodos();  // 新しいToDoを追加した後に再度取得
    }
  };

  // ToDoを削除
  const deleteTodo = async (id) => {
    const { error } = await supabase.from("todos").delete().eq("id", id);
    if (error) {
      console.error("ToDoの削除に失敗しました:", error);
    } else {
      fetchTodos();
    }
  };

  // ToDoの完了状態を変更
  const toggleTodo = async (id, done) => {
    const { error } = await supabase
      .from("todos")
      .update({ done: !done })
      .eq("id", id);

    if (error) {
      console.error("ToDoの完了状態の更新に失敗しました:", error);
    } else {
      fetchTodos();
    }
  };

  // フィルタリング
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
