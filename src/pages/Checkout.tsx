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
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    notes: '',
  });

  // Aceita apenas dígitos, +, espaço, hífen e parênteses
  const handlePhoneChange = (value: string) => {
    const cleaned = value.replace(/[^\d+\s()-]/g, '');
    setForm({ ...form, phone: cleaned });
  };

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) return toast.error('O carrinho está vazio.');

    // Verificar se o telefone tem pelo menos 9 dígitos
    const digitsOnly = form.phone.replace(/\D/g, '');
    if (digitsOnly.length < 9) {
      return toast.error('Telefone inválido. Introduz pelo menos 9 dígitos.');
    }

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
        <h1 className="text-3xl font-bold font-display text-ink-900 mb-4">
          O teu carrinho está vazio
        </h1>
        <p className="text-ink-800/60 mb-6">Explora os nossos produtos e adiciona itens.</p>
        <button
          onClick={() => navigate('/#produtos')}
          className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-full transition font-semibold"
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
        <h1 className="text-2xl font-bold font-display text-ink-900 mb-6">Finalizar Pedido</h1>
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 bg-white border border-brand-100 rounded-xl p-3"
            >
              {item.image_url && (
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
              )}
              <div className="flex-1">
                <h3 className="font-semibold text-ink-900">{item.name}</h3>
                <p className="text-brand-700 text-sm font-medium">
                  {item.price.toFixed(2)} MT
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-7 h-7 bg-brand-100 hover:bg-brand-200 text-ink-900 rounded-full font-bold transition"
                >
                  −
                </button>
                <span className="w-6 text-center text-ink-900 font-medium">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-7 h-7 bg-brand-100 hover:bg-brand-200 text-ink-900 rounded-full font-bold transition"
                >
                  +
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  className="ml-2 text-red-500 hover:text-red-700 font-bold"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-brand-900 text-cream-50 rounded-xl p-5 flex justify-between items-center">
          <span className="text-lg">Total:</span>
          <span className="text-2xl font-bold text-gold-300">
            {totalPrice.toFixed(2)} MT
          </span>
        </div>
      </div>

      {/* Formulário */}
      <form
        onSubmit={handleOrder}
        className="bg-white border border-brand-100 rounded-2xl p-6 space-y-4 h-fit"
      >
        <h2 className="text-xl font-bold font-display text-ink-900 mb-2">
          Dados de entrega
        </h2>

        <input
          placeholder="Nome completo *"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full bg-cream-50 border border-brand-200 rounded-xl px-4 py-3 text-ink-900 placeholder-ink-800/40 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition"
          required
        />

        <input
          type="tel"
          inputMode="numeric"
          placeholder="Telefone (ex: +258 84 000 0000) *"
          value={form.phone}
          onChange={(e) => handlePhoneChange(e.target.value)}
          pattern="[\d+\s()-]{9,}"
          title="Introduz pelo menos 9 dígitos. Podes usar +, espaço, hífen ou parênteses."
          className="w-full bg-cream-50 border border-brand-200 rounded-xl px-4 py-3 text-ink-900 placeholder-ink-800/40 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition"
          required
        />

        <input
          placeholder="Endereço / Cidade *"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          className="w-full bg-cream-50 border border-brand-200 rounded-xl px-4 py-3 text-ink-900 placeholder-ink-800/40 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition"
          required
        />

        <textarea
          placeholder="Notas adicionais (opcional)"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          rows={3}
          className="w-full bg-cream-50 border border-brand-200 rounded-xl px-4 py-3 text-ink-900 placeholder-ink-800/40 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition resize-none"
        />

        <p className="text-xs text-ink-800/50">
          * Campos obrigatórios. Entraremos em contacto para confirmar o pedido.
        </p>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white font-semibold py-3 rounded-xl transition shadow-lg disabled:opacity-70 flex items-center justify-center gap-3"
        >
          {loading ? <Loader size="sm" /> : 'Confirmar Pedido'}
        </button>
      </form>
    </div>
  );
}
