import React from 'react';
import { supabase } from '../supabaseClient';  // Supabaseクライアントのインポート

const Logout = () => {
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();  // サインアウト
      console.log('Logged out successfully');
      // ログアウト後のリダイレクトなど、必要に応じて処理を追加できます
      window.location.href = '/login';  // ホームページにリダイレクトする例
    } catch (error) {
      console.error('Error logging out: ', error.message);
    }
  };

  return (
    <button onClick={handleLogout} style={{ padding: '10px', backgroundColor: '#FF4C4C', color: 'white' }}>
      Logout
    </button>
  );
};

export default Logout;
