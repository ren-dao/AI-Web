import { prisma } from "@/lib/prisma";
import { StatsBarClient } from "@/components/home/stats-bar-client";

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

  return <StatsBarClient stats={stats} />;
}
