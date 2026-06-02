import { prisma } from "@/lib/prisma";

export async function StatsBar() {
  const [totalSideHustles, totalComments, totalRatings] = await Promise.all([
    prisma.sideHustle.count({ where: { isApproved: true } }),
    prisma.comment.count(),
    prisma.rating.count(),
  ]);

  const stats = [
    { label: "副业案例", value: totalSideHustles, suffix: "+" },
    { label: "真实评价", value: totalComments, suffix: "+" },
    { label: "分类覆盖", value: 15, suffix: "" },
    { label: "用户评分", value: totalRatings, suffix: "+" },
  ];

  return (
    <section className="py-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold mb-1">
                {stat.value}
                {stat.suffix}
              </div>
              <div className="text-sm opacity-80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
