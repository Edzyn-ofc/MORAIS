import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';
import { Loader } from '../components/Loader';

export function Checkout() {
  const { items, totalPrice, updateQuantity, removeItem, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', address: '', notes: '' });

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return toast.error('O carrinho está vazio.');
    setLoading(true);

    const { error } = await supabase.from('orders').insert([
      {
        user_id: user?.id ?? null,
        customer_name: form.name,
        customer_phone: form.phone,
        address: form.address,
        notes: form.notes,
        items: items,
        total: totalPrice,
        status: 'pendente',
      },
    ]);

    setLoading(false);

    if (error) {
      toast.error('Erro ao enviar pedido: ' + error.message);
      return;
    }

    toast.success('Pedido enviado! Entraremos em contacto.');
    clearCart();
    navigate('/');
  };

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto p-8 text-center">
        <h1 className="text-3xl font-bold mb-4">O teu carrinho está vazio</h1>
        <p className="text-gray-400 mb-6">Explora os nossos produtos e adiciona itens.</p>
        <button
          onClick={() => navigate('/#produtos')}
          className="bg-brand-600 hover:bg-brand-700 px-6 py-3 rounded-full transition"
        >
          Ver produtos
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 grid md:grid-cols-2 gap-8">
      {/* Lista de itens */}
      <div>
        <h1 className="text-2xl font-bold mb-6">Finalizar Pedido</h1>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-3">
              {item.image_url && (
                <img src={item.image_url} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
              )}
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-brand-400 text-sm">{item.price.toFixed(2)} MT</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 bg-white/10 rounded-full">−</button>
                <span className="w-6 text-center">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 bg-white/10 rounded-full">+</button>
                <button onClick={() => removeItem(item.id)} className="ml-2 text-red-400">🗑</button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-brand-900/30 border border-brand-500/30 rounded-xl p-4 flex justify-between items-center">
          <span className="text-lg">Total:</span>
          <span className="text-2xl font-bold text-brand-400">{totalPrice.toFixed(2)} MT</span>
        </div>
      </div>

      {/* Formulário */}
      <form onSubmit={handleOrder} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4 h-fit">
        <h2 className="text-xl font-bold mb-2">Dados de entrega</h2>
        <input
          placeholder="Nome completo *"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-brand-500 outline-none"
          required
        />
        <input
          placeholder="Telefone *"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-brand-500 outline-none"
          required
        />
        <input
          placeholder="Endereço / Cidade *"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-brand-500 outline-none"
          required
        />
        <textarea
          placeholder="Notas adicionais"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-brand-500 outline-none"
          rows={3}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-brand-500 to-brand-700 hover:from-brand-600 hover:to-brand-800 text-white font-semibold py-3 rounded-xl transition shadow-lg disabled:opacity-70 flex items-center justify-center gap-3"
        >
          {loading ? <Loader size="sm" /> : 'Confirmar Pedido'}
        </button>
      </form>
    </div>
  );
}