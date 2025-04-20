// src/App.js
import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import Login from './components/Login';
import Todo from './pages/Todo';

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    console.log('useEffect called');
    // 初期ロード時のセッション取得
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // ログイン/ログアウトの状態変更を監視
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // クリーンアップ
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  // ログインしていなければログイン画面へ
  if (!session) {
    return <Login />;
  }

  // ログイン済みならToDo画面へ
  return <Todo />;
}

export default App;
