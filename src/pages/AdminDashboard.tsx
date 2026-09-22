import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { IconPackage, IconCart, IconUsers } from '../components/Icons';

export function AdminDashboard() {
  const { user, role } = useAuth();

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-[240px_1fr] gap-6">
      <aside className="border-r border-brand-100 pr-4">
        <h2 className="font-bold text-lg mb-4 font-display text-ink-900">Painel Admin</h2>
        <p className="text-sm text-ink-800/70 mb-4">
          {user?.email}
          <br />
          <span className="text-xs bg-gold-200 text-ink-900 px-2 py-0.5 rounded inline-block mt-1">
            {role}
          </span>
        </p>
        <nav className="flex flex-col gap-1">
          <Link
            to="/admin/produtos"
            className="flex items-center gap-2 hover:bg-brand-50 hover:text-brand-700 p-2.5 rounded-lg transition text-sm font-medium"
          >
            <IconPackage className="w-4 h-4" />
            Produtos
          </Link>
          <Link
            to="/admin/pedidos"
            className="flex items-center gap-2 hover:bg-brand-50 hover:text-brand-700 p-2.5 rounded-lg transition text-sm font-medium"
          >
            <IconCart className="w-4 h-4" />
            Pedidos
          </Link>
          <Link
            to="/admin/usuarios"
            className="flex items-center gap-2 hover:bg-brand-50 hover:text-brand-700 p-2.5 rounded-lg transition text-sm font-medium"
          >
            <IconUsers className="w-4 h-4" />
            Utilizadores
          </Link>
        </nav>
      </aside>
      <section>
        <Outlet />
      </section>
    </div>
  );
}
