import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    setLoading(false);
    if (error) return alert(error.message);
    alert('Conta criada! Verifica o teu e-mail para confirmar.');
    navigate('/login');
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Criar Conta</h1>
      <form onSubmit={handleSignUp} className="space-y-3">
        <input
          type="text"
          placeholder="Nome completo"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Palavra-passe (mín. 6)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
          minLength={6}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-brand-600 text-white p-2 rounded hover:bg-brand-700"
        >
          {loading ? 'A criar...' : 'Registar'}
        </button>
      </form>
      <p className="mt-4 text-sm text-center">
        Já tens conta? <Link to="/login" className="text-brand-700 underline">Entrar</Link>
      </p>
    </div>
  );
}