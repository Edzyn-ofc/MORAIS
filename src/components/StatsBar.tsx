import { useEffect, useRef, useState } from 'react';

interface Stat {
  value: number;
  suffix?: string;
  label: string;
  icon: string;
}

const stats: Stat[] = [
  { value: 15, suffix: '+', label: 'Anos de experiência', icon: '🏆' },
  { value: 3, label: 'Lojas em Moçambique', icon: '📍' },
  { value: 500, suffix: '+', label: 'Clientes satisfeitos', icon: '🤝' },
  { value: 120, suffix: '+', label: 'Produtos disponíveis', icon: '📦' },
];

function Counter({ value, suffix }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1500;
        const start = performance.now();
        const animate = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          setCount(Math.floor(progress * value));
          if (progress < 1) requestAnimationFrame(animate);
          else setCount(value);
        };
        requestAnimationFrame(animate);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function StatsBar() {
  return (
    <section className="bg-brand-800 text-cream-50 py-14">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-3xl mb-2">{s.icon}</div>
            <div className="text-4xl md:text-5xl font-bold font-display text-gold-300">
              <Counter value={s.value} suffix={s.suffix} />
            </div>
            <p className="text-sm text-cream-200/80 mt-2">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}