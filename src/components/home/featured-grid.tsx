import { prisma } from "@/lib/prisma";
import { SideHustleCard } from "@/components/sidehustle/sidehustle-card";

export async function FeaturedGrid() {
  const featured = await prisma.sideHustle.findMany({
    where: {
      isApproved: true,
      isFeatured: true,
    },
    select: {
      id: true,
      title: true,
      slug: true,
      category: true,
      description: true,
      difficulty: true,
      timeInvestment: true,
      incomeMin: true,
      incomeMax: true,
      startupCost: true,
      requiredSkills: true,
      coverImage: true,
      averageRating: true,
      ratingCount: true,
      commentCount: true,
      viewCount: true,
      createdAt: true,
    },
    take: 6,
    orderBy: { averageRating: "desc" },
  });

  if (featured.length === 0) return null;

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">🔥 精选副业推荐</h2>
          <p className="text-muted-foreground">高评分、高口碑的优质副业，经过社区验证</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((item) => (
            <SideHustleCard key={item.id} {...item} createdAt={item.createdAt.toISOString()} />
          ))}
        </div>
      </div>
    </section>
  );
}
