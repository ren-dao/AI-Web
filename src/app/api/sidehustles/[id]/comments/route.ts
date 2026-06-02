import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createCommentSchema } from "@/lib/validators";

// GET /api/sidehustles/[id]/comments — 获取评论列表
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const parentId = searchParams.get("parentId") || null;

    // 验证副业存在
    const sideHustle = await prisma.sideHustle.findUnique({ where: { id } });
    if (!sideHustle) {
      return NextResponse.json({ error: "副业不存在" }, { status: 404 });
    }

    const where: Record<string, unknown> = {
      sideHustleId: id,
      parentId: parentId,
    };

    const total = await prisma.comment.count({ where: where as never });

    const comments = await prisma.comment.findMany({
      where: where as never,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        replies: {
          orderBy: { createdAt: "asc" },
          take: 5,
        },
      },
    });

    return NextResponse.json({
      data: comments,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("获取评论失败:", error);
    return NextResponse.json({ error: "获取评论失败" }, { status: 500 });
  }
}

// POST /api/sidehustles/[id]/comments — 创建评论
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const validated = createCommentSchema.parse(body);

    // 验证副业存在
    const sideHustle = await prisma.sideHustle.findUnique({ where: { id } });
    if (!sideHustle) {
      return NextResponse.json({ error: "副业不存在" }, { status: 404 });
    }

    // 如果是回复，验证父评论存在
    if (validated.parentId) {
      const parentComment = await prisma.comment.findUnique({
        where: { id: validated.parentId },
      });
      if (!parentComment || parentComment.sideHustleId !== id) {
        return NextResponse.json({ error: "父评论不存在" }, { status: 404 });
      }
    }

    const comment = await prisma.comment.create({
      data: {
        content: validated.content,
        authorName: validated.authorName,
        authorEmail: validated.authorEmail || null,
        sideHustleId: id,
        parentId: validated.parentId || null,
      },
    });

    // 更新评论计数
    await prisma.sideHustle.update({
      where: { id },
      data: { commentCount: { increment: 1 } },
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (error: unknown) {
    if (error && typeof error === "object" && "name" in error && error.name === "ZodError") {
      const zodError = error as unknown as { errors: Array<{ path: (string | number)[]; message: string }> };
      return NextResponse.json(
        { error: "数据验证失败", details: zodError.errors },
        { status: 400 }
      );
    }
    console.error("创建评论失败:", error);
    return NextResponse.json({ error: "创建评论失败" }, { status: 500 });
  }
}
