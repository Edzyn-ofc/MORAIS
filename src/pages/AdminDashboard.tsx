import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function AdminDashboard() {
  const { user, role } = useAuth();

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-[240px_1fr] gap-6">
      <aside className="border-r pr-4">
        <h2 className="font-bold text-lg mb-4">Painel Admin</h2>
        <p className="text-sm text-gray-600 mb-4">
          {user?.email} <br />
          <span className="text-xs bg-yellow-200 px-2 py-0.5 rounded">{role}</span>
        </p>
        <nav className="flex flex-col gap-2">
          <Link to="/admin/produtos" className="hover:bg-gray-100 p-2 rounded">📦 Produtos</Link>
          <Link to="/admin/usuarios" className="hover:bg-gray-100 p-2 rounded">👥 Utilizadores</Link>
        </nav>
      </aside>
      <section>
        <Outlet />
      </section>
    </div>
  );
}