"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, Share2, Sparkles } from "lucide-react";
import { useCountUp } from "@/hooks/use-count-up";

const HERO_STATS = [
  { label: "分类", value: 15, suffix: "+", delay: 300 },
  { label: "副业案例", value: 50, suffix: "+", delay: 500 },
  { label: "真实评价", value: 200, suffix: "+", delay: 700 },
];

function AnimatedStat({
  value,
  suffix,
  label,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}) {
  const { count, ref } = useCountUp({
    end: value,
    duration: 1500,
    startOnView: false,
    delay,
  });
  return (
    <div className="flex flex-col items-center">
      <span
        ref={ref}
        className="font-bold text-2xl lg:text-3xl text-foreground tabular-nums"
      >
        {count}
        {suffix}
      </span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden grain-overlay">
      {/* 深色渐变背景 */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/[0.03] to-purple-50/30 dark:from-background dark:via-primary/[0.06] dark:to-purple-950/40" />

      {/* 装饰性几何线网格 */}
      <div className="absolute inset-0 decorative-grid pointer-events-none" />

      {/* 浮动渐变光球 */}
      <div className="gradient-orb w-96 h-96 -top-32 -right-32 bg-primary/15 dark:bg-primary/20" />
      <div className="gradient-orb w-64 h-64 top-1/2 -left-20 bg-purple-400/10 dark:bg-purple-600/15" />
      <div className="gradient-orb w-48 h-48 bottom-10 right-1/4 bg-pink-400/8 dark:bg-pink-600/10" />

      {/* 装饰性几何块 */}
      <div className="absolute top-16 right-[15%] w-16 h-16 rounded-2xl border border-primary/10 rotate-12 opacity-60 hidden lg:block" />
      <div className="absolute bottom-20 left-[10%] w-8 h-8 rounded-full border border-purple-300/50 dark:border-purple-600/30 opacity-50 hidden lg:block" />
      <div className="absolute top-1/3 left-[5%] w-3 h-3 rounded bg-primary/20 rotate-45 hidden lg:block" />

      <div className="container mx-auto px-4 py-16 sm:py-24 lg:py-32 max-w-7xl relative z-[1]">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-center">
          {/* 左侧：文字内容 */}
          <div className="max-w-2xl">
            {/* 顶部标签 */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm mb-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <Sparkles className="h-3.5 w-3.5" />
              发现你的副业潜能
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.08] mb-6 tracking-tight">
              发现适合你的
              <br />
              <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                副业之路
              </span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground mb-8 leading-relaxed max-w-lg">
              数百个真实副业案例，涵盖自媒体、电商、编程、设计等15+热门领域。
              详细的入门指南和收入参考，帮助你找到最适合的方向。
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-12">
              <Link href="/sidehustles">
                <Button size="lg" className="gap-2 text-base px-8 h-12 rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25 transition-shadow">
                  <Search className="h-5 w-5" />
                  浏览副业
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/submit">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 text-base px-8 h-12 rounded-full"
                >
                  <Share2 className="h-5 w-5" />
                  分享经验
                </Button>
              </Link>
            </div>

            {/* 统计数字 */}
            <div className="flex items-center gap-8 sm:gap-12">
              {HERO_STATS.map((stat) => (
                <AnimatedStat key={stat.label} {...stat} />
              ))}
            </div>
          </div>

          {/* 右侧：装饰视觉 */}
          <div className="hidden lg:flex items-center justify-center relative">
            <div className="relative">
              {/* 大光球 + 环 */}
              <div className="w-72 h-72 rounded-full bg-gradient-to-br from-primary/30 via-purple-400/20 to-pink-400/20 dark:from-primary/25 dark:via-purple-500/15 dark:to-pink-500/15 blur-2xl absolute inset-0" />
              <div className="w-72 h-72 rounded-full border-2 border-primary/10 flex items-center justify-center relative">
                <div className="w-56 h-56 rounded-full border border-dashed border-primary/15 flex items-center justify-center">
                  <div className="w-40 h-40 rounded-full bg-gradient-to-br from-primary/5 to-purple-100/30 dark:from-primary/10 dark:to-purple-900/20 flex items-center justify-center backdrop-blur-sm">
                    <span className="text-6xl">💼</span>
                  </div>
                </div>
              </div>
              {/* 浮动小卡片 */}
              <div className="absolute -top-4 -right-4 bg-card border rounded-xl px-4 py-2 shadow-lg animate-in fade-in slide-in-from-top-2 duration-700 delay-300">
                <span className="text-sm font-medium">✨ 50+ 案例</span>
              </div>
              <div className="absolute -bottom-2 -left-2 bg-card border rounded-xl px-4 py-2 shadow-md animate-in fade-in slide-in-from-bottom-2 duration-700 delay-500">
                <span className="text-sm font-medium">⭐ 4.8 均分</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
