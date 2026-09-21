// Exemplo de componente de listagem de produtos
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((p) => (
        <div key={p.id} className="border rounded-lg p-4 shadow">
          {p.image_url && <img src={p.image_url} alt={p.name} className="w-full h-48 object-cover rounded" />}
          <h3 className="text-xl font-semibold mt-2">{p.name}</h3>
          <p className="text-gray-600">{p.description}</p>
          <p className="text-green-700 font-bold mt-1">{p.price.toFixed(2)} MT</p>
        </div>
      ))}
    </div>
  );
}