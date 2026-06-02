import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { DetailContent } from "./detail-content";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const sh = await prisma.sideHustle.findUnique({
    where: { id },
    select: { title: true, description: true, coverImage: true },
  });

  if (!sh) return { title: "副业不存在" };

  return {
    title: sh.title,
    description: sh.description,
    openGraph: {
      title: sh.title,
      description: sh.description,
      images: sh.coverImage ? [sh.coverImage] : [],
    },
  };
}

export default async function DetailPage({ params }: Props) {
  const { id } = await params;

  const sideHustle = await prisma.sideHustle.findUnique({
    where: { id },
  });

  if (!sideHustle || !sideHustle.isApproved) {
    notFound();
  }

  // 更新浏览量
  await prisma.sideHustle.update({
    where: { id },
    data: { viewCount: { increment: 1 } },
  });

  const jsonParse = (str: string) => {
    try {
      return JSON.parse(str);
    } catch {
      return [];
    }
  };

  const data = {
    ...sideHustle,
    createdAt: sideHustle.createdAt.toISOString(),
    updatedAt: sideHustle.updatedAt.toISOString(),
    requiredSkills: jsonParse(sideHustle.requiredSkills),
    toolsResources: jsonParse(sideHustle.toolsResources),
    stepsToStart: jsonParse(sideHustle.stepsToStart),
    pros: jsonParse(sideHustle.pros),
    cons: jsonParse(sideHustle.cons),
    tipsForSuccess: jsonParse(sideHustle.tipsForSuccess),
    resourceLinks: jsonParse(sideHustle.resourceLinks),
    viewCount: sideHustle.viewCount + 1,
  };

  return <DetailContent data={data} />;
}
