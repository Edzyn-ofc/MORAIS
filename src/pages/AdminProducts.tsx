import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  stock: number;
}

export function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: 0,
    image_url: '',
    category: '',
    stock: 0,
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) console.error(error);
    if (data) setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      const { error } = await supabase
        .from('products')
        .update(form)
        .eq('id', editingId);
      if (error) return alert(error.message);
      alert('Produto atualizado!');
    } else {
      const { error } = await supabase.from('products').insert([form]);
      if (error) return alert(error.message);
      alert('Produto adicionado!');
    }
    setForm({ name: '', description: '', price: 0, image_url: '', category: '', stock: 0 });
    setEditingId(null);
    fetchProducts();
  };

  const handleEdit = (p: Product) => {
    setForm({
      name: p.name,
      description: p.description ?? '',
      price: Number(p.price),
      image_url: p.image_url ?? '',
      category: p.category ?? '',
      stock: p.stock ?? 0,
    });
    setEditingId(p.id);
  };

  const handleCancelEdit = () => {
    setForm({ name: '', description: '', price: 0, image_url: '', category: '', stock: 0 });
    setEditingId(null);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Tens a certeza que queres eliminar este produto?')) return;
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) return alert(error.message);
    fetchProducts();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Gerenciar Produtos</h1>

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="mb-8 bg-gray-50 p-4 rounded space-y-2">
        <input
          placeholder="Nome *"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded w-full"
          required
        />
        <input
          placeholder="Descrição"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <div className="flex gap-2">
          <input
            type="number"
            step="0.01"
            placeholder="Preço (MT)"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })}
            className="border p-2 rounded w-full"
          />
          <input
            type="number"
            placeholder="Stock"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: parseInt(e.target.value) || 0 })}
            className="border p-2 rounded w-full"
          />
        </div>
        <input
          placeholder="URL da Imagem"
          value={form.image_url}
          onChange={(e) => setForm({ ...form, image_url: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <input
          placeholder="Categoria"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-brand-600 text-white px-4 py-2 rounded hover:bg-brand-700"
          >
            {editingId ? 'Guardar alterações' : 'Adicionar Produto'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* Lista */}
      {products.length === 0 ? (
        <p className="text-gray-500">Nenhum produto cadastrado ainda.</p>
      ) : (
        <div className="grid gap-3">
          {products.map((p) => (
            <div
              key={p.id}
              className="flex justify-between items-center border p-4 rounded bg-white"
            >
              <div className="flex items-center gap-3">
                {p.image_url && (
                  <img
                    src={p.image_url}
                    alt={p.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
                <div>
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="text-sm text-gray-500">
                    {Number(p.price).toFixed(2)} MT · Stock: {p.stock} · {p.category}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(p)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}