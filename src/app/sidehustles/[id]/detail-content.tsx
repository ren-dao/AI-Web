"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { RatingDisplay } from "@/components/rating/rating-display";
import { CommentSection } from "@/components/comment/comment-section";
import { ShareDialog } from "@/components/share/share-dialog";
import { formatCurrency, formatDate } from "@/lib/format";
import { DIFFICULTY_LEVELS } from "@/lib/constants";
import {
  Clock,
  DollarSign,
  Rocket,
  CheckCircle2,
  XCircle,
  Lightbulb,
  ExternalLink,
  Share2,
  Eye,
  ChevronLeft,
  User,
} from "lucide-react";
import type { ResourceLink } from "@/types";

interface DetailContentProps {
  data: {
    id: string;
    title: string;
    slug: string;
    category: string;
    description: string;
    fullDescription: string;
    difficulty: string;
    timeInvestment: string;
    incomeMin: number;
    incomeMax: number;
    startupCost: string;
    requiredSkills: string[];
    toolsResources: string[];
    stepsToStart: string[];
    pros: string[];
    cons: string[];
    tipsForSuccess: string[];
    resourceLinks: ResourceLink[];
    coverImage: string | null;
    averageRating: number;
    ratingCount: number;
    commentCount: number;
    viewCount: number;
    submitterName: string;
    createdAt: string;
    updatedAt: string;
  };
}

export function DetailContent({ data }: DetailContentProps) {
  const router = useRouter();
  const [shareOpen, setShareOpen] = useState(false);
  const difficulty = DIFFICULTY_LEVELS.find((d) => d.value === data.difficulty);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div>
      {/* 封面图 */}
      {data.coverImage && (
        <div className="relative h-48 sm:h-64 md:h-80 overflow-hidden bg-muted">
          <img
            src={data.coverImage}
            alt={data.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      )}

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* 返回按钮 */}
        <Button
          variant="ghost"
          size="sm"
          className="mb-4 gap-2"
          onClick={() => router.back()}
        >
          <ChevronLeft className="h-4 w-4" />
          返回
        </Button>

        {/* 标题区域 */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge variant="secondary">{data.category}</Badge>
            {difficulty && (
              <Badge className={difficulty.color}>{difficulty.label}</Badge>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-heading mb-3">{data.title}</h1>
          <p className="text-muted-foreground mb-4">{data.description}</p>

          {/* 统计信息 */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm">
            <RatingDisplay
              averageRating={data.averageRating}
              ratingCount={data.ratingCount}
            />
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{data.timeInvestment}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <DollarSign className="h-4 w-4 text-green-500" />
              <span>
                {formatCurrency(data.incomeMin)} - {formatCurrency(data.incomeMax)} / 月
              </span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Eye className="h-4 w-4" />
              <span>{data.viewCount} 浏览</span>
            </div>
          </div>

          {/* 分享和作者 */}
          <div className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t">
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => setShareOpen(true)}
            >
              <Share2 className="h-4 w-4" />
              分享
            </Button>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span>分享者：{data.submitterName}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              发布于 {formatDate(data.createdAt)}
            </div>
          </div>
        </div>

        {/* 标签页内容 */}
        <Tabs defaultValue="overview" className="mt-8">
          <TabsList className="w-full justify-start gap-0 border-b rounded-none bg-transparent p-0">
            <TabsTrigger
              value="overview"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              概览
            </TabsTrigger>
            <TabsTrigger
              value="guide"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              入门指南
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              评价 ({data.commentCount})
            </TabsTrigger>
            <TabsTrigger
              value="resources"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              资源
            </TabsTrigger>
          </TabsList>

          {/* 概览 */}
          <TabsContent value="overview" className="mt-6 space-y-6">
            <div className="prose prose-gray dark:prose-invert max-w-none whitespace-pre-wrap">
              {data.fullDescription}
            </div>

            <Separator />

            {/* 优点 */}
            {data.pros.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  优点
                </h3>
                <ul className="space-y-2">
                  {data.pros.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-green-500 mt-1">✅</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 缺点 */}
            {data.cons.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-500" />
                  缺点和挑战
                </h3>
                <ul className="space-y-2">
                  {data.cons.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-red-500 mt-1">❌</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 成功贴士 */}
            {data.tipsForSuccess.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-amber-500" />
                  成功贴士
                </h3>
                <ul className="space-y-2">
                  {data.tipsForSuccess.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-amber-500 mt-1">💡</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </TabsContent>

          {/* 入门指南 */}
          <TabsContent value="guide" className="mt-6 space-y-6">
            {/* 启动成本 */}
            <div className="flex items-center gap-2 p-4 bg-muted/30 rounded-lg">
              <Rocket className="h-5 w-5 text-primary" />
              <span className="text-sm">
                启动成本：<strong>{data.startupCost}</strong>
              </span>
            </div>

            {/* 所需技能 */}
            {data.requiredSkills.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">所需技能</h3>
                <div className="flex flex-wrap gap-2">
                  {data.requiredSkills.map((skill, i) => (
                    <Badge key={i} variant="secondary" className="px-3 py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* 所需工具 */}
            {data.toolsResources.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">所需工具/资源</h3>
                <div className="flex flex-wrap gap-2">
                  {data.toolsResources.map((tool, i) => (
                    <Badge key={i} variant="outline" className="px-3 py-1">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* 入门步骤 */}
            {data.stepsToStart.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">入门步骤</h3>
                <ol className="space-y-3 list-none pl-0">
                  {data.stepsToStart.map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                        {i + 1}
                      </span>
                      <span className="pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </TabsContent>

          {/* 评价 */}
          <TabsContent value="reviews" className="mt-6">
            <CommentSection sideHustleId={data.id} />
          </TabsContent>

          {/* 资源 */}
          <TabsContent value="resources" className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold mb-3">推荐资源</h3>
            {data.resourceLinks.length > 0 ? (
              <div className="space-y-3">
                {data.resourceLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors group"
                  >
                    <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <div>
                      <div className="font-medium text-sm group-hover:text-primary transition-colors">
                        {link.title}
                      </div>
                      <div className="text-xs text-muted-foreground truncate max-w-md">
                        {link.url}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">暂无推荐资源</p>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* 分享弹窗 */}
      <ShareDialog
        open={shareOpen}
        onOpenChange={setShareOpen}
        title={data.title}
        url={shareUrl}
      />
    </div>
  );
}
