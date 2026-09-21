import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';
import { Loader } from '../components/Loader';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      toast.error(
        error.message === 'Email not confirmed'
          ? 'Confirma o teu e-mail antes de entrar.'
          : 'E-mail ou palavra-passe incorretos.'
      );
      return;
    }
    toast.success('Bem-vindo de volta! 🌱');
    navigate('/admin');
  };

  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white border border-brand-100 rounded-3xl shadow-xl shadow-brand-900/5 p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-lg mb-4">
              <span className="text-3xl">🌱</span>
            </div>
            <h1 className="text-2xl font-bold text-ink-900 font-display">Bem-vindo</h1>
            <p className="text-sm text-ink-800/60 mt-1">Entra na tua conta Morais</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink-800 mb-1">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-cream-100 border border-brand-100 rounded-xl px-4 py-3 text-ink-900 placeholder-ink-800/40 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
                placeholder="o-teu@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-800 mb-1">Palavra-passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-cream-100 border border-brand-100 rounded-xl px-4 py-3 text-ink-900 placeholder-ink-800/40 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white font-semibold py-3 rounded-xl transition-all shadow-lg hover:shadow-brand-900/20 disabled:opacity-70 flex items-center justify-center gap-3"
            >
              {loading ? <Loader size="sm" /> : 'Entrar'}
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-ink-800/70">
            Não tens conta?{' '}
            <Link to="/register" className="text-brand-700 hover:text-brand-800 font-semibold underline">
              Registar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}