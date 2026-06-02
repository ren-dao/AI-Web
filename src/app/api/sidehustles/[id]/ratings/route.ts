import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createRatingSchema } from "@/lib/validators";

// GET /api/sidehustles/[id]/ratings — 获取评分汇总
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    // 验证副业存在
    const sideHustle = await prisma.sideHustle.findUnique({ where: { id } });
    if (!sideHustle) {
      return NextResponse.json({ error: "副业不存在" }, { status: 404 });
    }

    // 获取评分分布
    const ratings = await prisma.rating.findMany({
      where: { sideHustleId: id },
    });

    const distribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    for (const r of ratings) {
      if (r.value >= 1 && r.value <= 5) {
        distribution[r.value]++;
      }
    }

    const averageRating =
      ratings.length > 0
        ? Math.round(
            (ratings.reduce((sum, r) => sum + r.value, 0) / ratings.length) * 10
          ) / 10
        : 0;

    // 查找用户评分
    let userRating = null;
    if (email) {
      const existing = await prisma.rating.findUnique({
        where: {
          sideHustleId_authorEmail: {
            sideHustleId: id,
            authorEmail: email,
          },
        },
      });
      if (existing) {
        userRating = { value: existing.value };
      }
    }

    return NextResponse.json({
      averageRating,
      ratingCount: ratings.length,
      distribution,
      userRating,
    });
  } catch (error) {
    console.error("获取评分失败:", error);
    return NextResponse.json({ error: "获取评分失败" }, { status: 500 });
  }
}

// POST /api/sidehustles/[id]/ratings — 提交/更新评分
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const validated = createRatingSchema.parse(body);

    // 验证副业存在
    const sideHustle = await prisma.sideHustle.findUnique({ where: { id } });
    if (!sideHustle) {
      return NextResponse.json({ error: "副业不存在" }, { status: 404 });
    }

    // Upsert 评分
    if (validated.authorEmail) {
      await prisma.rating.upsert({
        where: {
          sideHustleId_authorEmail: {
            sideHustleId: id,
            authorEmail: validated.authorEmail,
          },
        },
        update: {
          value: validated.value,
        },
        create: {
          value: validated.value,
          authorName: validated.authorName,
          authorEmail: validated.authorEmail,
          sideHustleId: id,
        },
      });
    } else {
      // 没有邮箱直接创建新评分
      await prisma.rating.create({
        data: {
          value: validated.value,
          authorName: validated.authorName,
          authorEmail: null,
          sideHustleId: id,
        },
      });
    }

    // 重新计算平均分
    const allRatings = await prisma.rating.findMany({
      where: { sideHustleId: id },
    });

    const averageRating =
      allRatings.length > 0
        ? Math.round(
            (allRatings.reduce((sum, r) => sum + r.value, 0) / allRatings.length) * 10
          ) / 10
        : 0;

    // 更新副业评分计数
    await prisma.sideHustle.update({
      where: { id },
      data: {
        averageRating,
        ratingCount: allRatings.length,
      },
    });

    // 计算分布
    const distribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    for (const r of allRatings) {
      if (r.value >= 1 && r.value <= 5) {
        distribution[r.value]++;
      }
    }

    // 查找用户评分
    let userRating = null;
    if (validated.authorEmail) {
      userRating = { value: validated.value };
    }

    return NextResponse.json({
      averageRating,
      ratingCount: allRatings.length,
      distribution,
      userRating,
    });
  } catch (error: unknown) {
    if (error && typeof error === "object" && "name" in error && error.name === "ZodError") {
      const zodError = error as unknown as { errors: Array<{ path: (string | number)[]; message: string }> };
      return NextResponse.json(
        { error: "数据验证失败", details: zodError.errors },
        { status: 400 }
      );
    }
    console.error("提交评分失败:", error);
    return NextResponse.json({ error: "提交评分失败" }, { status: 500 });
  }
}
