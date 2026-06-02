import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { searchQuerySchema, createSideHustleSchema } from "@/lib/validators";
import { generateUniqueSlug } from "@/lib/slug";

// GET /api/sidehustles — 获取副业列表（支持搜索、筛选、排序、分页）
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchQuerySchema.parse(Object.fromEntries(searchParams));

    const { page, limit, search, category, difficulty, sortBy, minIncome, maxIncome } = query;

    // 构建查询条件
    const where: Record<string, unknown> = {
      isApproved: true,
    };

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
      ];
    }

    if (category) {
      where.category = category;
    }

    if (difficulty) {
      where.difficulty = difficulty;
    }

    if (minIncome !== undefined) {
      where.incomeMax = { gte: minIncome };
    }

    if (maxIncome !== undefined) {
      where.incomeMin = { lte: maxIncome };
    }

    // 排序
    let orderBy: Record<string, string> = { createdAt: "desc" };
    switch (sortBy) {
      case "popular":
        orderBy = { viewCount: "desc" };
        break;
      case "rating":
        orderBy = { averageRating: "desc" };
        break;
      case "income":
        orderBy = { incomeMax: "desc" };
        break;
      default:
        orderBy = { createdAt: "desc" };
    }

    // 查询总数
    const total = await prisma.sideHustle.count({ where: where as never });

    // 查询数据
    const data = await prisma.sideHustle.findMany({
      where: where as never,
      orderBy: orderBy as never,
      skip: (page - 1) * limit,
      take: limit,
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
    });

    return NextResponse.json({
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("获取副业列表失败:", error);
    return NextResponse.json({ error: "获取副业列表失败" }, { status: 500 });
  }
}

// POST /api/sidehustles — 创建新副业
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = createSideHustleSchema.parse(body);

    const slug = await generateUniqueSlug(validated.title, async (s) => {
      const existing = await prisma.sideHustle.findUnique({ where: { slug: s } });
      return !!existing;
    });

    const sideHustle = await prisma.sideHustle.create({
      data: {
        ...validated,
        slug,
        coverImage: validated.coverImage || null,
        submitterEmail: validated.submitterEmail || null,
      },
    });

    return NextResponse.json(sideHustle, { status: 201 });
  } catch (error: unknown) {
    if (error && typeof error === "object" && "name" in error && error.name === "ZodError") {
      const zodError = error as unknown as { errors: Array<{ path: (string | number)[]; message: string }> };
      return NextResponse.json(
        { error: "数据验证失败", details: zodError.errors },
        { status: 400 }
      );
    }
    console.error("创建副业失败:", error);
    return NextResponse.json({ error: "创建副业失败" }, { status: 500 });
  }
}
