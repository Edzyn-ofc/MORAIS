const items = [
  {
    name: 'João Machava',
    role: 'Produtor — Nampula',
    text: 'Serviço impecável. Recebi os insumos no prazo e com ótima qualidade.',
    initials: 'JM',
    color: 'bg-brand-600',
  },
  {
    name: 'Amélia Sitoe',
    role: 'Cooperativa — Chimoio',
    text: 'A Morais Comercial é o nosso parceiro de confiança há mais de 5 anos.',
    initials: 'AS',
    color: 'bg-gold-500',
  },
  {
    name: 'Carlos Ndala',
    role: 'Agricultor — Pemba',
    text: 'Preços justos, atendimento rápido e produtos certificados. Recomendo!',
    initials: 'CN',
    color: 'bg-clay-500',
  },
];

export function Testimonials() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold font-display text-ink-900 mb-2 text-center">
        O que dizem os nossos clientes
      </h2>
      <p className="text-center text-ink-800/60 mb-10">
        Histórias reais de quem confia na Morais Comercial
      </p>
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((t) => (
          <div
            key={t.name}
            className="bg-white border border-brand-100 rounded-2xl p-6 hover:shadow-xl hover:shadow-brand-900/5 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-full ${t.color} flex items-center justify-center text-white font-bold`}>
                {t.initials}
              </div>
              <div>
                <h4 className="font-semibold text-ink-900 text-sm">{t.name}</h4>
                <p className="text-xs text-ink-800/60">{t.role}</p>
              </div>
            </div>
            <p className="text-sm text-ink-800/80 italic leading-relaxed">"{t.text}"</p>
            <div className="mt-4 text-gold-500 text-sm">★★★★★</div>
          </div>
        ))}
      </div>
    </section>
  );
}