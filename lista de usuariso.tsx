// src/pages/AdminUsers.tsx
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Usuários Cadastrados</h1>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Nome</th>
            <th className="border p-2">ID</th>
            <th className="border p-2">Papel</th>
            <th className="border p-2">Data de Cadastro</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td className="border p-2">{u.full_name || '—'}</td>
              <td className="border p-2 text-xs">{u.id}</td>
              <td className="border p-2">{u.role}</td>
              <td className="border p-2">{new Date(u.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}