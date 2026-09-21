import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface Profile {
  id: string;
  full_name: string | null;
  role: string;
  created_at: string;
}

export function AdminUsers() {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) console.error(error);
      if (data) setUsers(data);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const toggleRole = async (id: string, currentRole: string) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    if (!confirm(`Alterar para "${newRole}"?`)) return;
    const { error } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('id', id);
    if (error) return alert(error.message);
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, role: newRole } : u))
    );
  };

  if (loading) return <p className="p-4">Carregando utilizadores...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Utilizadores Cadastrados</h1>

      {users.length === 0 ? (
        <p className="text-gray-500">Nenhum utilizador registado ainda.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="border p-2">Nome</th>
                <th className="border p-2">Papel</th>
                <th className="border p-2">Data de Cadastro</th>
                <th className="border p-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td className="border p-2">
                    {u.full_name || '—'}
                    <div className="text-xs text-gray-400">{u.id}</div>
                  </td>
                  <td className="border p-2">
                    <span
                      className={
                        u.role === 'admin'
                          ? 'bg-yellow-200 px-2 py-0.5 rounded text-xs'
                          : 'bg-gray-200 px-2 py-0.5 rounded text-xs'
                      }
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="border p-2">
                    {new Date(u.created_at).toLocaleDateString('pt-PT')}
                  </td>
                  <td className="border p-2">
                    <button
                      onClick={() => toggleRole(u.id, u.role)}
                      className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                    >
                      {u.role === 'admin' ? 'Remover admin' : 'Tornar admin'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}