import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/search — 搜索自动补全
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q");

    if (!q || q.length < 1) {
      return NextResponse.json({ suggestions: [] });
    }

    const suggestions = await prisma.sideHustle.findMany({
      where: {
        isApproved: true,
        title: { contains: q },
      },
      select: {
        id: true,
        title: true,
        category: true,
        slug: true,
      },
      take: 8,
      orderBy: { averageRating: "desc" },
    });

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error("搜索失败:", error);
    return NextResponse.json({ error: "搜索失败" }, { status: 500 });
  }
}
