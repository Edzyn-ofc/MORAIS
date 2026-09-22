import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';
import { IconPackage, IconPhone, IconMapPin } from '../components/Icons';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: number;
  user_id: string | null;
  customer_name: string;
  customer_phone: string;
  address: string;
  notes: string | null;
  items: OrderItem[];
  total: number;
  status: string;
  created_at: string;
}

const STATUSES = ['pendente', 'confirmado', 'enviado', 'entregue', 'cancelado'];

const statusColors: Record<string, string> = {
  pendente: 'bg-gold-100 text-gold-800 border-gold-300',
  confirmado: 'bg-brand-100 text-brand-800 border-brand-300',
  enviado: 'bg-blue-100 text-blue-800 border-blue-300',
  entregue: 'bg-green-100 text-green-800 border-green-300',
  cancelado: 'bg-red-100 text-red-800 border-red-300',
};

export function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<string>('todos');
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    const loadOrders = async () => {
      console.log('🔍 A verificar utilizador...');

      const { data: userData, error: userError } = await supabase.auth.getUser();
      console.log('👤 Utilizador:', userData?.user?.id);
      console.log('❌ Erro auth:', userError);

      console.log('🔍 A pedir pedidos...');

      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      console.log('📦 Resultado bruto:', { data, error });
      console.log('📊 Nº de pedidos:', data?.length);
      console.log('⚠️ Erro:', error);

      if (error) {
        console.error('Erro ao buscar pedidos:', error);
        toast.error('Erro ao carregar pedidos: ' + error.message);
      }

      if (data) setOrders(data);
      setLoading(false);
    };

    loadOrders();
  }, []);

  const updateStatus = async (id: number, status: string) => {
    const { error } = await supabase.from('orders').update({ status }).eq('id', id);
    if (error) return toast.error(error.message);
    toast.success('Estado atualizado');
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  const deleteOrder = async (id: number) => {
    if (!confirm('Eliminar este pedido?')) return;
    const { error } = await supabase.from('orders').delete().eq('id', id);
    if (error) return toast.error(error.message);
    toast.success('Pedido eliminado');
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  const filtered = filter === 'todos' ? orders : orders.filter((o) => o.status === filter);

  if (loading) return <p className="p-4">Carregando pedidos...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold font-display text-ink-900">Pedidos</h1>
          <p className="text-sm text-ink-800/60 mt-1">
            {orders.length} pedido{orders.length !== 1 ? 's' : ''} no total
          </p>
        </div>

        <div className="flex gap-2 flex-wrap">
          {['todos', ...STATUSES].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${
                filter === s
                  ? 'bg-brand-600 text-white border-brand-600'
                  : 'bg-white text-ink-800/70 border-brand-200 hover:border-brand-400'
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-ink-800/50 bg-white border border-dashed border-brand-200 rounded-2xl">
          <IconPackage className="w-12 h-12 mb-3 text-brand-300" />
          <p className="text-sm">
            Nenhum pedido {filter !== 'todos' ? `com estado "${filter}"` : ''}.
          </p>
        </div>
      ) : (
        <div className="grid gap-3">
          {filtered.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-brand-100 rounded-2xl overflow-hidden"
            >
              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-cream-50 transition"
                onClick={() => setExpanded(expanded === order.id ? null : order.id)}
              >
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="font-bold text-ink-900">#{order.id}</span>
                  <span className="text-sm text-ink-800/70">{order.customer_name}</span>
                  <span className="text-xs text-ink-800/50">
                    {new Date(order.created_at).toLocaleString('pt-PT')}
                  </span>
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full border ${statusColors[order.status] || ''}`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-brand-700">
                    {Number(order.total).toFixed(2)} MT
                  </span>
                  <span className="text-ink-800/40 text-lg">
                    {expanded === order.id ? '−' : '+'}
                  </span>
                </div>
              </div>

              {expanded === order.id && (
                <div className="border-t border-brand-100 p-4 bg-cream-50/50">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-sm text-ink-900 mb-3 uppercase tracking-wider">
                        Dados do Cliente
                      </h3>
                      <ul className="space-y-2 text-sm text-ink-800/80">
                        <li>
                          <strong>Nome:</strong> {order.customer_name}
                        </li>
                        <li className="flex items-center gap-2">
                          <IconPhone className="w-4 h-4 text-brand-600" />
                          <a
                            href={`tel:${order.customer_phone}`}
                            className="text-brand-700 hover:underline"
                          >
                            {order.customer_phone}
                          </a>
                        </li>
                        <li className="flex items-start gap-2">
                          <IconMapPin className="w-4 h-4 text-brand-600 mt-0.5 flex-shrink-0" />
                          <span>{order.address}</span>
                        </li>
                        {order.notes && (
                          <li className="pt-2 border-t border-brand-100">
                            <strong>Notas:</strong> {order.notes}
                          </li>
                        )}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-sm text-ink-900 mb-3 uppercase tracking-wider">
                        Produtos
                      </h3>
                      <ul className="space-y-2">
                        {order.items.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex justify-between text-sm bg-white border border-brand-100 rounded-lg px-3 py-2"
                          >
                            <span>
                              {item.name}{' '}
                              <span className="text-ink-800/50">× {item.quantity}</span>
                            </span>
                            <span className="font-medium text-brand-700">
                              {(item.price * item.quantity).toFixed(2)} MT
                            </span>
                          </li>
                        ))}
                        <li className="flex justify-between pt-2 border-t border-brand-200 font-bold text-ink-900">
                          <span>Total</span>
                          <span className="text-brand-700">
                            {Number(order.total).toFixed(2)} MT
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-brand-100 flex flex-wrap gap-3 items-center">
                    <label className="text-sm font-medium text-ink-800">Alterar estado:</label>
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      className="border border-brand-200 rounded-lg px-3 py-1.5 text-sm bg-white"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => deleteOrder(order.id)}
                      className="ml-auto bg-red-100 hover:bg-red-200 text-red-700 px-4 py-1.5 rounded-lg text-sm font-medium transition"
                    >
                      Eliminar pedido
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
