import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

export function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => data && setProducts(data));
  }, []);

  return (
    <div>
      {/* HERO */}
      <section className="bg-brand-700 text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">Morais Comercial LDA</h1>
        <p className="mt-3 text-lg opacity-90">
          Soluções em agronegócio, insumos e serviços para todo o Moçambique.
        </p>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="max-w-5xl mx-auto p-8">
        <h2 className="text-3xl font-bold mb-4">Sobre Nós</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-4 border rounded">
            <h3 className="font-semibold text-brand-700">Missão</h3>
            <p>Fornecer produtos e serviços de qualidade que impulsionem o agronegócio.</p>
          </div>
          <div className="p-4 border rounded">
            <h3 className="font-semibold text-brand-700">Visão</h3>
            <p>Ser referência nacional em comercialização agropecuária.</p>
          </div>
          <div className="p-4 border rounded">
            <h3 className="font-semibold text-brand-700">Valores</h3>
            <p>Integridade, compromisso, inovação e proximidade com o cliente.</p>
          </div>
        </div>
      </section>

      {/* PRODUTOS */}
      <section id="produtos" className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto p-6">
          <h2 className="text-3xl font-bold mb-6">Produtos</h2>
          {products.length === 0 ? (
            <p className="text-gray-500">Nenhum produto cadastrado ainda.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products.map((p) => (
                <div key={p.id} className="border rounded-lg p-4 shadow bg-white">
                  {p.image_url && (
                    <img src={p.image_url} alt={p.name} className="w-full h-48 object-cover rounded" />
                  )}
                  <h3 className="text-xl font-semibold mt-2">{p.name}</h3>
                  <p className="text-gray-600">{p.description}</p>
                  <p className="text-brand-700 font-bold mt-1">{Number(p.price).toFixed(2)} MT</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SERVIÇOS */}
      <section id="servicos" className="max-w-6xl mx-auto p-8">
        <h2 className="text-3xl font-bold mb-6">Serviços</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {['Insumos agrícolas', 'Assistência técnica', 'Transporte', 'Comercialização',
            'Irrigação', 'Sementes', 'Fertilizantes', 'Consultoria'].map((s) => (
            <div key={s} className="p-4 border rounded text-center">{s}</div>
          ))}
        </div>
      </section>

      {/* LOJAS */}
      <section id="lojas" className="bg-brand-50 py-12">
        <div className="max-w-6xl mx-auto p-6">
          <h2 className="text-3xl font-bold mb-6">Nossas Lojas</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {['Nampula', 'Pemba', 'Chimoio'].map((c) => (
              <div key={c} className="bg-white p-6 rounded shadow">
                <h3 className="font-semibold text-lg">{c}</h3>
                <p className="text-gray-600 text-sm">Atendimento de segunda a sábado.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTOS */}
      <section id="contactos" className="max-w-5xl mx-auto p-8">
        <h2 className="text-3xl font-bold mb-4">Contactos</h2>
        <ul className="space-y-2">
          <li>📞 <a className="text-brand-700" href="tel:+258840000000">+258 84 000 0000</a></li>
          <li>💬 <a className="text-brand-700" href="https://wa.me/258840000000">WhatsApp</a></li>
          <li>✉️ <a className="text-brand-700" href="mailto:geral@morais.co.mz">geral@morais.co.mz</a></li>
        </ul>
      </section>
    </div>
  );
}