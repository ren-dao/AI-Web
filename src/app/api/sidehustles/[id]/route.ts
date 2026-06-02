import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/sidehustles/[id] — 获取副业详情
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const sideHustle = await prisma.sideHustle.findUnique({
      where: { id },
    });

    if (!sideHustle || !sideHustle.isApproved) {
      return NextResponse.json({ error: "副业不存在" }, { status: 404 });
    }

    // 增加浏览量
    await prisma.sideHustle.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
    });

    return NextResponse.json({
      ...sideHustle,
      viewCount: sideHustle.viewCount + 1,
    });
  } catch (error) {
    console.error("获取副业详情失败:", error);
    return NextResponse.json({ error: "获取副业详情失败" }, { status: 500 });
  }
}

// PATCH /api/sidehustles/[id] — 更新副业信息
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const existing = await prisma.sideHustle.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "副业不存在" }, { status: 404 });
    }

    // 只允许更新部分字段
    const allowedFields = [
      "title", "description", "fullDescription", "coverImage",
      "timeInvestment", "incomeMin", "incomeMax", "startupCost",
      "requiredSkills", "toolsResources", "stepsToStart",
      "pros", "cons", "tipsForSuccess", "resourceLinks",
    ];

    const updateData: Record<string, unknown> = {};
    for (const key of allowedFields) {
      if (body[key] !== undefined) {
        updateData[key] = body[key];
      }
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: "没有可更新的字段" }, { status: 400 });
    }

    const updated = await prisma.sideHustle.update({
      where: { id },
      data: updateData as never,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("更新副业失败:", error);
    return NextResponse.json({ error: "更新副业失败" }, { status: 500 });
  }
}
