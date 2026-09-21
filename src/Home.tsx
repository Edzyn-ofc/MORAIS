import { useParallax } from 'react-scroll-parallax';
import { ScrollReveal } from '../components/ScrollReveal';
import { ProductList } from '../components/ProductList';

export function Home() {
  const heroParallax = useParallax<HTMLDivElement>({ speed: -15 });
  const sobreParallax = useParallax<HTMLDivElement>({ speed: -8 });

  return (
    <div className="relative overflow-hidden">
      {/* HERO com parallax */}
      <section ref={heroParallax.ref} className="relative py-32 text-center">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
          Morais Comercial LDA
        </h1>
        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
          Soluções em agronegócio, insumos e serviços para todo o Moçambique.
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <a href="#produtos" className="bg-brand-600 hover:bg-brand-500 px-6 py-3 rounded-full transition shadow-lg">
            Ver Produtos
          </a>
          <a href="#contactos" className="border border-white/20 hover:bg-white/10 px-6 py-3 rounded-full transition">
            Contactar
          </a>
        </div>
      </section>

      {/* SOBRE com scroll reveal */}
      <section id="sobre" ref={sobreParallax.ref} className="max-w-5xl mx-auto p-8">
        <ScrollReveal>
          <h2 className="text-3xl font-bold mb-6">Sobre Nós</h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-6">
          {['Missão', 'Visão', 'Valores'].map((t, i) => (
            <ScrollReveal key={t} delay={i * 150}>
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 hover:border-brand-500/40 transition">
                <h3 className="font-semibold text-brand-400 mb-2">{t}</h3>
                <p className="text-sm text-gray-300">Texto a fornecer pela Morais Comercial LDA.</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* PRODUTOS com contador de carrinho */}
      <section id="produtos" className="py-16 bg-black/20">
        <div className="max-w-6xl mx-auto p-6">
          <ScrollReveal>
            <h2 className="text-3xl font-bold mb-8">Produtos</h2>
          </ScrollReveal>
          <ProductList />
        </div>
      </section>
    </div>
  );
}