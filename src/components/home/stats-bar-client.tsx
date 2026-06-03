"use client";

import { useCountUp } from "@/hooks/use-count-up";

interface StatItem {
  label: string;
  value: number;
  suffix: string;
}

export function StatsBarClient({ stats }: { stats: StatItem[] }) {
  return (
    <section className="py-12 bg-gradient-to-r from-primary to-purple-600 text-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <StatItemClient key={stat.label} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItemClient({ stat }: { stat: StatItem }) {
  const { count, ref } = useCountUp({ end: stat.value, duration: 1500 });

  return (
    <div className="text-center">
      <div className="text-3xl sm:text-4xl font-bold mb-1">
        <span ref={ref}>{count}</span>
        {stat.suffix}
      </div>
      <div className="text-sm opacity-80">{stat.label}</div>
    </div>
  );
}
