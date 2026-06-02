import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, Share2 } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* 渐变背景 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950 dark:via-purple-950 dark:to-pink-950" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-200/40 via-transparent to-transparent dark:from-blue-800/20" />

      <div className="container mx-auto px-4 py-16 sm:py-24 lg:py-32 max-w-7xl relative">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            发现适合你的
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {" "}副业之路
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed">
            数百个真实副业案例，涵盖自媒体、电商、编程、设计等15+热门领域。
            详细的入门指南、收入参考和技能要求，帮助你找到最适合的副业方向。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/sidehustles">
              <Button size="lg" className="gap-2 text-base px-8 h-12">
                <Search className="h-5 w-5" />
                浏览副业
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/submit">
              <Button size="lg" variant="outline" className="gap-2 text-base px-8 h-12">
                <Share2 className="h-5 w-5" />
                分享经验
              </Button>
            </Link>
          </div>
          <div className="flex items-center justify-center gap-8 mt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <span className="font-bold text-foreground">15+</span> 分类
            </div>
            <div className="flex items-center gap-1">
              <span className="font-bold text-foreground">50+</span> 副业案例
            </div>
            <div className="flex items-center gap-1">
              <span className="font-bold text-foreground">200+</span> 真实评价
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
