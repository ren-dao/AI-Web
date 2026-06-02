import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";

export function CategoryBrowse() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">📂 按分类浏览</h2>
          <p className="text-muted-foreground">15大热门副业分类，总有一个适合你</p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.value}
              href={`/sidehustles?category=${encodeURIComponent(cat.value)}`}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border bg-card hover:shadow-md hover:border-primary/50 transition-all group"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">
                {cat.icon}
              </span>
              <span className="text-sm font-medium text-center">{cat.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
