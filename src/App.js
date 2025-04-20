// src/App.js
import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import Login from './components/Login';
import Todo from './pages/Todo';

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // 初期ロード時：セッション取得
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // セッションの変更を監視
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // クリーンアップ
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      {!session ? (
        <Login />
      ) : (
        <Todo session={session} />
      )}
    </>
  );
}

export default App;
