import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { IconChart } from './Icons';

interface CategoryCount {
  category: string;
  count: number;
}

export function CategoryChart() {
  const [data, setData] = useState<CategoryCount[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const { data: products } = await supabase.from('products').select('category');
      if (!products) return;
      const map: Record<string, number> = {};
      products.forEach((p) => {
        const cat = p.category || 'Sem categoria';
        map[cat] = (map[cat] || 0) + 1;
      });
      setData(
        Object.entries(map)
          .map(([category, count]) => ({ category, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 6)
      );
    };
    fetch();
  }, []);

  if (data.length === 0) {
    return (
      <div className="bg-white border border-brand-100 rounded-2xl p-8 text-center text-ink-800/50">
        <IconChart className="w-10 h-10 mx-auto mb-3 text-brand-300" />
        <p className="text-sm">Sem dados para o gráfico.</p>
      </div>
    );
  }

  const max = Math.max(...data.map((d) => d.count));
  const rowHeight = 36;
  const chartHeight = data.length * rowHeight;
  const labelWidth = 130;
  const chartWidth = 320;
  const totalWidth = labelWidth + chartWidth + 50;

  return (
    <div className="bg-white border border-brand-100 rounded-2xl p-6 sticky top-24">
      <div className="flex items-center gap-2 mb-1">
        <IconChart className="w-5 h-5 text-brand-600" />
        <h3 className="font-bold font-display text-lg text-ink-900">Por Categoria</h3>
      </div>
      <p className="text-xs text-ink-800/50 mb-5">Distribuição do catálogo atual</p>

      <svg
        viewBox={`0 0 ${totalWidth} ${chartHeight}`}
        className="w-full"
        preserveAspectRatio="xMinYMin meet"
      >
        {data.map((d, i) => {
          const y = i * rowHeight;
          const w = (d.count / max) * chartWidth;
          return (
            <g key={d.category}>
              <text
                x={labelWidth - 10}
                y={y + 20}
                textAnchor="end"
                className="fill-ink-800 text-[11px] font-medium"
              >
                {d.category.length > 16 ? d.category.slice(0, 15) + '…' : d.category}
              </text>
              <rect x={labelWidth} y={y + 6} width={chartWidth} height={18} rx={9} className="fill-cream-200" />
              <rect x={labelWidth} y={y + 6} width={w} height={18} rx={9} className="fill-brand-500">
                <animate attributeName="width" from="0" to={w} dur="1.1s" fill="freeze" />
              </rect>
              <text
                x={labelWidth + w + 10}
                y={y + 20}
                className="fill-brand-800 text-[11px] font-bold"
              >
                {d.count}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}