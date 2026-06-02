"use client";

import { useState, useEffect, useCallback } from "react";
import { CommentForm } from "@/components/comment/comment-form";
import { CommentItem } from "@/components/comment/comment-item";
import { RatingBreakdown } from "@/components/rating/rating-breakdown";
import { StarRating } from "@/components/rating/star-rating";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import type { CommentData, RatingSummary } from "@/types";
import { MessageCircle } from "lucide-react";

interface CommentSectionProps {
  sideHustleId: string;
}

export function CommentSection({ sideHustleId }: CommentSectionProps) {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [ratingSummary, setRatingSummary] = useState<RatingSummary | null>(null);
  const [showRatingDialog, setShowRatingDialog] = useState(false);
  const [ratingValue, setRatingValue] = useState(0);
  const [ratingName, setRatingName] = useState("");
  const [ratingEmail, setRatingEmail] = useState("");
  const [ratingSubmitting, setRatingSubmitting] = useState(false);

  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch(
        `/api/sidehustles/${sideHustleId}/comments?page=1&limit=20`
      );
      if (res.ok) {
        const json = await res.json();
        setComments(json.data || []);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [sideHustleId]);

  const fetchRatings = useCallback(async () => {
    try {
      const res = await fetch(`/api/sidehustles/${sideHustleId}/ratings`);
      if (res.ok) {
        const json = await res.json();
        setRatingSummary(json);
      }
    } catch {
      // ignore
    }
  }, [sideHustleId]);

  useEffect(() => {
    fetchComments();
    fetchRatings();
  }, [fetchComments, fetchRatings]);

  const handleSubmitRating = async () => {
    if (!ratingValue || !ratingName.trim()) {
      toast.error("请填写评分和名字");
      return;
    }
    setRatingSubmitting(true);
    try {
      const res = await fetch(`/api/sidehustles/${sideHustleId}/ratings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          value: ratingValue,
          authorName: ratingName.trim(),
          authorEmail: ratingEmail.trim() || null,
        }),
      });
      if (res.ok) {
        const json = await res.json();
        setRatingSummary(json);
        toast.success("评分成功！感谢你的评价");
        setShowRatingDialog(false);
        setRatingValue(0);
        setRatingName("");
        setRatingEmail("");
      } else {
        toast.error("评分失败，请重试");
      }
    } catch {
      toast.error("网络错误");
    } finally {
      setRatingSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* 评分区 */}
      {ratingSummary && (
        <RatingBreakdown
          averageRating={ratingSummary.averageRating}
          ratingCount={ratingSummary.ratingCount}
          distribution={ratingSummary.distribution}
          onRate={() => setShowRatingDialog(true)}
        />
      )}

      <Separator />

      {/* 评论表单 */}
      <div>
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          发表评论
        </h3>
        <CommentForm
          sideHustleId={sideHustleId}
          onSuccess={fetchComments}
          placeholder="分享你对这个副业的看法..."
        />
      </div>

      <Separator />

      {/* 评论列表 */}
      <div className="space-y-4">
        <h3 className="font-semibold">
          全部评论 ({comments.length})
        </h3>
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex gap-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <MessageCircle className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>还没有评论，来做第一个评论的人吧！</p>
          </div>
        ) : (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              sideHustleId={sideHustleId}
              onRefresh={fetchComments}
            />
          ))
        )}
      </div>

      {/* 评分弹窗 */}
      <Dialog open={showRatingDialog} onOpenChange={setShowRatingDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>为这个副业评分</DialogTitle>
            <DialogDescription>你的评分将帮助更多人了解这个副业</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex justify-center">
              <StarRating value={ratingValue} onChange={setRatingValue} size="lg" />
            </div>
            {ratingValue > 0 && (
              <p className="text-center text-sm text-muted-foreground">
                {ratingValue === 5 && "非常推荐！"}
                {ratingValue === 4 && "推荐"}
                {ratingValue === 3 && "一般"}
                {ratingValue === 2 && "不太推荐"}
                {ratingValue === 1 && "不推荐"}
              </p>
            )}
            <div className="space-y-2">
              <Label>你的名字</Label>
              <Input
                value={ratingName}
                onChange={(e) => setRatingName(e.target.value)}
                placeholder="请输入你的名字"
              />
            </div>
            <div className="space-y-2">
              <Label>邮箱（可选，用于识别你的评分）</Label>
              <Input
                value={ratingEmail}
                onChange={(e) => setRatingEmail(e.target.value)}
                placeholder="请输入邮箱"
                type="email"
              />
            </div>
            <Button
              className="w-full"
              onClick={handleSubmitRating}
              disabled={!ratingValue || !ratingName.trim() || ratingSubmitting}
            >
              {ratingSubmitting ? "提交中..." : "提交评分"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
