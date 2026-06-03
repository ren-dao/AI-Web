import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";

const CATEGORY_BG: Record<string, string> = {
  "自媒体": "bg-blue-50 dark:bg-blue-950/30 hover:bg-blue-100 dark:hover:bg-blue-900/40 border-blue-200 dark:border-blue-800",
  "电商": "bg-orange-50 dark:bg-orange-950/30 hover:bg-orange-100 dark:hover:bg-orange-900/40 border-orange-200 dark:border-orange-800",
  "在线教育": "bg-green-50 dark:bg-green-950/30 hover:bg-green-100 dark:hover:bg-green-900/40 border-green-200 dark:border-green-800",
  "自由职业": "bg-purple-50 dark:bg-purple-950/30 hover:bg-purple-100 dark:hover:bg-purple-900/40 border-purple-200 dark:border-purple-800",
  "内容创作": "bg-pink-50 dark:bg-pink-950/30 hover:bg-pink-100 dark:hover:bg-pink-900/40 border-pink-200 dark:border-pink-800",
  "软件开发": "bg-cyan-50 dark:bg-cyan-950/30 hover:bg-cyan-100 dark:hover:bg-cyan-900/40 border-cyan-200 dark:border-cyan-800",
  "设计创意": "bg-violet-50 dark:bg-violet-950/30 hover:bg-violet-100 dark:hover:bg-violet-900/40 border-violet-200 dark:border-violet-800",
  "咨询辅导": "bg-teal-50 dark:bg-teal-950/30 hover:bg-teal-100 dark:hover:bg-teal-900/40 border-teal-200 dark:border-teal-800",
  "短视频": "bg-red-50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-900/40 border-red-200 dark:border-red-800",
  "直播带货": "bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 dark:hover:bg-rose-900/40 border-rose-200 dark:border-rose-800",
  "知识付费": "bg-indigo-50 dark:bg-indigo-950/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 border-indigo-200 dark:border-indigo-800",
  "代购海淘": "bg-amber-50 dark:bg-amber-950/30 hover:bg-amber-100 dark:hover:bg-amber-900/40 border-amber-200 dark:border-amber-800",
  "翻译写作": "bg-lime-50 dark:bg-lime-950/30 hover:bg-lime-100 dark:hover:bg-lime-900/40 border-lime-200 dark:border-lime-800",
  "摄影摄像": "bg-sky-50 dark:bg-sky-950/30 hover:bg-sky-100 dark:hover:bg-sky-900/40 border-sky-200 dark:border-sky-800",
  "其他": "bg-gray-50 dark:bg-gray-800/30 hover:bg-gray-100 dark:hover:bg-gray-800/40 border-gray-200 dark:border-gray-700",
};

export function CategoryBrowse() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">
            <span className="inline-flex items-center justify-center bg-primary/10 rounded-full p-2 mr-2">
              <span className="text-2xl">📂</span>
            </span>
            按分类浏览
          </h2>
          <p className="text-muted-foreground mt-3">15大热门副业分类，总有一个适合你</p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3">
          {CATEGORIES.map((cat) => {
            const bgClass = CATEGORY_BG[cat.value] || "";
            return (
              <Link
                key={cat.value}
                href={`/sidehustles?category=${encodeURIComponent(cat.value)}`}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border bg-card hover:shadow-md hover:border-primary/50 transition-all group ${bgClass}`}
              >
                <span className="text-3xl group-hover:scale-110 transition-transform">
                  {cat.icon}
                </span>
                <span className="text-sm font-medium text-center">{cat.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
