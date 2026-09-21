// src/pages/AdminProducts.tsx
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [form, setForm] = useState({ name: '', description: '', price: 0, image_url: '', category: '', stock: 0 });

  const fetchProducts = async () => {
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (data) setProducts(data);
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('products').insert([form]);
    if (error) alert(error.message);
    else {
      alert('Produto adicionado!');
      setForm({ name: '', description: '', price: 0, image_url: '', category: '', stock: 0 });
      fetchProducts();
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza?')) return;
    await supabase.from('products').delete().eq('id', id);
    fetchProducts();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gerenciar Produtos</h1>

      {/* Formulário de Adição */}
      <form onSubmit={handleSubmit} className="mb-8 bg-gray-50 p-4 rounded">
        <input placeholder="Nome" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="border p-2 m-1" required />
        <input placeholder="Descrição" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="border p-2 m-1" />
        <input type="number" placeholder="Preço" value={form.price} onChange={e => setForm({...form, price: parseFloat(e.target.value)})} className="border p-2 m-1" />
        <input placeholder="URL da Imagem" value={form.image_url} onChange={e => setForm({...form, image_url: e.target.value})} className="border p-2 m-1" />
        <input placeholder="Categoria" value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="border p-2 m-1" />
        <input type="number" placeholder="Stock" value={form.stock} onChange={e => setForm({...form, stock: parseInt(e.target.value)})} className="border p-2 m-1" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded m-1">Adicionar Produto</button>
      </form>

      {/* Lista de Produtos */}
      <div className="grid gap-4">
        {products.map(p => (
          <div key={p.id} className="flex justify-between items-center border p-4 rounded">
            <div>
              <h3 className="font-semibold">{p.name}</h3>
              <p className="text-sm text-gray-500">{p.price} MT</p>
            </div>
            <button onClick={() => handleDelete(p.id)} className="bg-red-500 text-white px-3 py-1 rounded">Excluir</button>
          </div>
        ))}
      </div>
    </div>
  );
}