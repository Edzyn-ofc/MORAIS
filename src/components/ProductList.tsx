import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';
import { IconPackage } from './Icons';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const { addItem } = useCart();

  useEffect(() => {
    supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => data && setProducts(data));
  }, []);

  const handleAdd = (p: Product) => {
    addItem({ id: p.id, name: p.name, price: Number(p.price), image_url: p.image_url });
    toast.success(`${p.name} adicionado ao carrinho.`);
  };

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-ink-800/50 bg-white border border-dashed border-brand-200 rounded-2xl">
        <IconPackage className="w-12 h-12 mb-3 text-brand-300" />
        <p className="text-sm">Nenhum produto cadastrado ainda.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p) => (
        <div
          key={p.id}
          className="group bg-white border border-brand-100 rounded-2xl overflow-hidden hover:border-brand-300 hover:shadow-2xl hover:shadow-brand-900/10 hover:-translate-y-1 transition-all duration-500"
        >
          <div className="relative overflow-hidden bg-cream-100 h-48">
            {p.image_url ? (
              <img
                src={p.image_url}
                alt={p.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-brand-300">
                <IconPackage className="w-16 h-16" />
              </div>
            )}
          </div>
          <div className="p-5">
            <h3 className="text-lg font-bold font-display text-ink-900 mb-1">{p.name}</h3>
            <p className="text-sm text-ink-800/60 line-clamp-2 leading-relaxed">{p.description}</p>
            <div className="flex items-center justify-between mt-5">
              <span className="text-brand-700 font-bold text-lg font-display">
                {Number(p.price).toFixed(2)}
                <span className="text-xs text-ink-800/50 font-normal ml-1">MT</span>
              </span>
              <button
                onClick={() => handleAdd(p)}
                className="bg-ink-900 hover:bg-brand-700 text-white text-xs font-semibold tracking-wide uppercase px-4 py-2 rounded-full transition-all duration-300"
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}