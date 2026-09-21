import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { ScrollReveal } from '../components/ScrollReveal';
import { ProductList } from '../components/ProductList';
import { StatsBar } from '../components/StatsBar';
import { CategoryChart } from '../components/CategoryChart';
import { Testimonials } from '../components/Testimonials';
import {
  IconTarget, IconTelescope, IconGem,
  IconLeaf, IconTools, IconTruck, IconDroplet, IconChart as IconChartIcon,
  IconSearch, IconWarehouse, IconShield, IconCube, IconSeed, IconBuilding,
  IconMapPin, IconPhone, IconMail, IconWhatsApp, IconArrowRight,
} from '../components/Icons';

export function Home() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(6)
      .then(({ data }) => data && setProducts(data));
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* ================== HERO com foto ================== */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Foto de fundo — parallax sutil */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{
            backgroundImage: "url('/hero-field.jpg')",
            transform: 'scale(1.1)',
          }}
        />
        {/* Camadas de gradiente para o efeito surreal */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/95 via-ink-950/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-ink-950/40" />
        {/* Brilho verde decorativo */}
        <div className="absolute top-1/4 -left-20 w-[28rem] h-[28rem] bg-brand-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-[24rem] h-[24rem] bg-gold-500/15 rounded-full blur-[120px]" />

        <div className="relative max-w-7xl mx-auto px-6 py-24 w-full">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/15 text-gold-200 text-xs font-medium tracking-widest uppercase px-4 py-2 rounded-full mb-8">
              <IconLeaf className="w-3.5 h-3.5" />
              Agronegócio Moçambicano · Desde 2010
            </span>

            <h1 className="text-5xl md:text-7xl font-extrabold font-display text-white leading-[1.05] tracking-tight">
              Cultivamos{' '}
              <span className="bg-gradient-to-r from-gold-300 via-gold-400 to-brand-300 bg-clip-text text-transparent">
                confiança
              </span>
              ,
              <br />
              colhemos{' '}
              <span className="bg-gradient-to-r from-brand-300 via-brand-400 to-gold-300 bg-clip-text text-transparent">
                resultados
              </span>
              .
            </h1>

            <p className="mt-7 text-lg md:text-xl text-cream-100/85 max-w-2xl leading-relaxed">
              Sementes melhoradas, insumos agrícolas e assistência técnica
              para pequenos e médios produtores em Nampula, Pemba e Chimoio.
            </p>

            <div className="mt-10 flex gap-4 flex-wrap">
              <a
                href="#produtos"
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white px-8 py-4 rounded-full font-semibold shadow-2xl shadow-brand-900/40 hover:shadow-brand-700/50 transition-all duration-300 hover:-translate-y-0.5"
              >
                Ver Produtos
                <IconArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contactos"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/25 hover:bg-white/20 hover:border-white/40 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:-translate-y-0.5"
              >
                Falar connosco
              </a>
            </div>
          </div>
        </div>

        {/* Indicador de scroll */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
          <span className="text-[10px] tracking-[0.3em] uppercase">Deslize</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/50 to-transparent" />
        </div>
      </section>

      {/* ================== ESTATÍSTICAS ================== */}
      <StatsBar />

      {/* ================== PERFIL ================== */}
      <section id="sobre" className="relative max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <div>
              <span className="text-xs font-bold tracking-widest text-brand-600 uppercase">
                Perfil da Empresa
              </span>
              <h2 className="text-3xl md:text-5xl font-bold font-display text-ink-900 mt-3 mb-8 leading-tight">
                Mais de 15 anos a servir o agronegócio nacional
              </h2>
              <div className="space-y-5 text-ink-800/80 leading-relaxed">
                <p>
                  A <strong className="text-brand-700 font-semibold">Morais Comercial Lda (MC)</strong> é uma
                  empresa moçambicana do ramo do agronegócio, vocacionada na produção,
                  processamento, venda de sementes certificadas, comércio geral e outros
                  insumos agrícolas, com experiência de mais de <strong>15 anos</strong> no
                  mercado moçambicano.
                </p>
                <p>
                  Localizada na cidade de <strong>Nampula</strong>, na Av. Do Trabalho nº 3250,
                  a MC possui <strong>3 lojas</strong> — em Nampula, Pemba e Chimoio.
                </p>
                <p>
                  Atua como <strong>Agrodealer</strong> e produtor de sementes melhoradas,
                  atendendo a produtores, ONGs, empresas privadas, empresas públicas e
                  programas governamentais focados na produção agrícola.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  { Icon: IconSeed, label: 'Sementes certificadas' },
                  { Icon: IconWarehouse, label: '3 lojas nacionais' },
                  { Icon: IconShield, label: 'Qualidade garantida' },
                ].map((b) => (
                  <span key={b.label} className="inline-flex items-center gap-2 bg-brand-50 border border-brand-100 text-brand-800 text-sm font-medium px-4 py-2 rounded-full">
                    <b.Icon className="w-4 h-4 text-brand-600" />
                    {b.label}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="relative">
              {/* Moldura decorativa */}
              <div className="absolute -inset-4 bg-gradient-to-br from-brand-200/40 via-gold-100/40 to-clay-200/40 rounded-3xl blur-2xl" />
              <div className="relative grid grid-cols-2 gap-4">
                <img
                  src="/tractor-spray.jpg"
                  alt="Pulverização agrícola"
                  className="rounded-2xl w-full h-56 object-cover col-span-2 shadow-xl"
                />
                <img
                  src="/irrigation-1.jpg"
                  alt="Irrigação por aspersão"
                  className="rounded-2xl w-full h-48 object-cover shadow-xl"
                />
                <img
                  src="/irrigation-2.jpg"
                  alt="Rega por gotejamento"
                  className="rounded-2xl w-full h-48 object-cover shadow-xl"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ================== MISSÃO / VISÃO / VALOR ================== */}
      <section className="relative bg-gradient-to-br from-cream-100 via-cream-50 to-brand-50 border-y border-brand-100 py-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-200/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-200/30 rounded-full blur-[100px]" />

        <div className="relative max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-xs font-bold tracking-widest text-brand-600 uppercase">
                Os nossos princípios
              </span>
              <h2 className="text-3xl md:text-5xl font-bold font-display text-ink-900 mt-3">
                O que nos move
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { Icon: IconTarget, title: 'Missão', text: 'Fornecer sementes e promover serviços de assistência técnica aos pequenos e médios produtores, oferecendo sementes melhoradas de alta qualidade, com uma quota de mercado nacional de 10% até 2030, aumentando a disponibilidade de sementes no mercado e os lucros da empresa através da adição de valor.', color: 'from-brand-500 to-brand-700' },
              { Icon: IconTelescope, title: 'Visão', text: 'Tornar-se uma empresa de agronegócio de referência nacional e internacional na produção, processamento, comercialização e distribuição de sementes melhoradas de alta qualidade, produzidas em parceria com pequenos produtores, com retornos financeiros sustentáveis e ganho mútuo.', color: 'from-gold-400 to-gold-600' },
              { Icon: IconGem, title: 'Valor', text: 'Não é apenas uma empresa jovem do agronegócio — é o seu parceiro certo na agricultura, com potencial para atender as necessidades dos produtores em zonas urbanas e suburbanas, empresas e instalações.', color: 'from-clay-400 to-clay-600' },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 150}>
                <div className="group relative bg-white/80 backdrop-blur-xl border border-brand-100 rounded-3xl p-8 hover:shadow-2xl hover:shadow-brand-900/10 hover:-translate-y-2 transition-all duration-500 h-full overflow-hidden">
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} opacity-[0.07] rounded-full blur-2xl group-hover:opacity-[0.15] transition-opacity`} />
                  <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    <item.Icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold font-display text-2xl text-ink-900 mb-4">{item.title}</h3>
                  <p className="text-sm text-ink-800/75 leading-relaxed">{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================== PRODUTOS ================== */}
      <section id="produtos" className="relative bg-cream-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="flex justify-between items-end mb-10 flex-wrap gap-4">
              <div>
                <span className="text-xs font-bold tracking-widest text-brand-600 uppercase">
                  Catálogo
                </span>
                <h2 className="text-3xl md:text-5xl font-bold font-display text-ink-900 mt-3">
                  Os nossos produtos
                </h2>
                <p className="text-ink-800/60 mt-3 max-w-xl">
                  Sementes certificadas, insumos e equipamentos agrícolas selecionados.
                </p>
              </div>
              <a href="/checkout" className="group inline-flex items-center gap-2 text-brand-700 hover:text-brand-800 font-semibold text-sm">
                Ver carrinho
                <IconArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <ProductList />
            </div>
            <div className="lg:col-span-1">
              <CategoryChart />
            </div>
          </div>
        </div>
      </section>

      {/* ================== SERVIÇOS ================== */}
      <section id="servicos" className="relative bg-brand-900 text-cream-50 py-24 overflow-hidden">
        <div
          className="absolute inset-0 opacity-15 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero-field.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-900 via-brand-900/85 to-brand-900" />

        <div className="relative max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-xs font-bold tracking-widest text-gold-300 uppercase">
                O que fazemos
              </span>
              <h2 className="text-3xl md:text-5xl font-bold font-display text-white mt-3">
                Serviços Especializados
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { Icon: IconLeaf, t: 'Assistência técnica agro-pecuária' },
              { Icon: IconBuilding, t: 'Venda de insumos agrícolas e comércio geral' },
              { Icon: IconDroplet, t: 'Instalação e manutenção de sistema de irrigação' },
              { Icon: IconTools, t: 'Construção de aviário — vedação, desinfecção química e orgânica' },
              { Icon: IconCube, t: 'Preparação de ração — milho, concentrado e A2' },
              { Icon: IconTruck, t: 'Transporte e logística de produtos agrícolas e pecuária' },
              { Icon: IconSearch, t: 'Inspecção e monitoria de campos' },
              { Icon: IconChartIcon, t: 'Consultoria em agronegócio e gestão agrícola' },
            ].map((s, i) => (
              <ScrollReveal key={s.t} delay={i * 60}>
                <div className="group relative bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/[0.08] hover:border-gold-400/40 hover:-translate-y-1 transition-all duration-500 h-full overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gold-400/10 rounded-full blur-2xl group-hover:bg-gold-400/20 transition-colors" />
                  <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-gold-400/20 to-brand-500/20 border border-white/10 flex items-center justify-center text-gold-300 mb-4 group-hover:scale-110 transition-transform">
                    <s.Icon className="w-6 h-6" />
                  </div>
                  <p className="relative text-sm font-medium text-cream-100 leading-snug">{s.t}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================== TESTEMUNHOS ================== */}
      <Testimonials />

      {/* ================== LOJAS ================== */}
      <section id="lojas" className="bg-gradient-to-br from-cream-100 to-cream-50 border-y border-brand-100 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-xs font-bold tracking-widest text-brand-600 uppercase">
                Onde estamos
              </span>
              <h2 className="text-3xl md:text-5xl font-bold font-display text-ink-900 mt-3">
                3 Lojas em Moçambique
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { c: 'Nampula', a: 'Av. Do Trabalho nº 3250', t: '+258 84 100 0001', main: true },
              { c: 'Pemba', a: 'Cidade de Pemba', t: '+258 84 100 0002', main: false },
              { c: 'Chimoio', a: 'Cidade de Chimoio', t: '+258 84 100 0003', main: false },
            ].map((l, i) => (
              <ScrollReveal key={l.c} delay={i * 150}>
                <div className={`group relative p-8 rounded-3xl border transition-all duration-500 hover:-translate-y-2 h-full overflow-hidden ${
                  l.main
                    ? 'bg-gradient-to-br from-brand-600 to-brand-800 text-white border-brand-700 shadow-2xl shadow-brand-900/30'
                    : 'bg-white border-brand-100 text-ink-900 hover:shadow-2xl hover:shadow-brand-900/10'
                }`}>
                  {l.main && (
                    <span className="inline-block bg-gold-400 text-ink-900 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4">
                      Sede Principal
                    </span>
                  )}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform ${
                    l.main ? 'bg-white/10 backdrop-blur' : 'bg-brand-50'
                  }`}>
                    <IconMapPin className={`w-7 h-7 ${l.main ? 'text-gold-300' : 'text-brand-600'}`} />
                  </div>
                  <h3 className="font-bold font-display text-2xl mb-2">{l.c}</h3>
                  <p className={`text-sm ${l.main ? 'text-cream-100/90' : 'text-ink-800/70'}`}>{l.a}</p>
                  <p className={`text-sm mt-1 font-medium ${l.main ? 'text-gold-200' : 'text-brand-700'}`}>{l.t}</p>
                  <p className={`text-xs mt-4 tracking-wide ${l.main ? 'text-cream-100/60' : 'text-ink-800/50'}`}>
                    Segunda a sábado · 8h–17h
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================== CONTACTOS ================== */}
      <section id="contactos" className="max-w-7xl mx-auto px-6 py-24">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest text-brand-600 uppercase">
              Fala connosco
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-display text-ink-900 mt-3">
              Estamos prontos para ajudar
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { Icon: IconPhone, label: 'Telefone', value: '+258 84 000 0000', href: 'tel:+258870528285' },
            { Icon: IconWhatsApp, label: 'WhatsApp', value: 'Resposta rápida', href: 'https://wa.me/258870528285' },
            { Icon: IconMail, label: 'E-mail', value: 'geral@morais.co.mz', href: 'mailto:geral@morais.co.mz' },
          ].map((c, i) => (
            <ScrollReveal key={c.label} delay={i * 120}>
              <a href={c.href} className="group block bg-white border border-brand-100 rounded-3xl p-8 text-center hover:border-brand-400 hover:shadow-2xl hover:shadow-brand-900/10 hover:-translate-y-2 transition-all duration-500">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 text-brand-700 mb-4 group-hover:scale-110 group-hover:from-brand-500 group-hover:to-brand-700 group-hover:text-white transition-all duration-500">
                  <c.Icon className="w-7 h-7" />
                </div>
                <p className="font-bold font-display text-lg text-ink-900">{c.label}</p>
                <p className="text-sm text-ink-800/60 mt-1">{c.value}</p>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}