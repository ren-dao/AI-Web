"use client";

import { Star, Plus } from "lucide-react";
import { StarRating } from "@/components/rating/star-rating";
import { Button } from "@/components/ui/button";

interface RatingBreakdownProps {
  averageRating: number;
  ratingCount: number;
  distribution: Record<number, number>;
  onRate: () => void;
}

export function RatingBreakdown({
  averageRating,
  ratingCount,
  distribution,
  onRate,
}: RatingBreakdownProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-4 bg-muted/30 rounded-xl">
      {/* 左侧：平均分 */}
      <div className="text-center">
        <div className="text-4xl font-bold text-primary">{averageRating}</div>
        <div className="text-sm text-muted-foreground">共 {ratingCount} 条评价</div>
        <StarRating value={Math.round(averageRating)} readOnly size="sm" />
      </div>

      {/* 中间：分布条 */}
      <div className="flex-1 space-y-1.5 w-full max-w-xs">
        {[5, 4, 3, 2, 1].map((star) => {
          const count = distribution[star] || 0;
          const pct = ratingCount > 0 ? (count / ratingCount) * 100 : 0;
          return (
            <div key={star} className="flex items-center gap-2 text-sm">
              <span className="w-4 text-right text-muted-foreground">{star}</span>
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="w-8 text-right text-xs text-muted-foreground">{count}</span>
            </div>
          );
        })}
      </div>

      {/* 右侧：评分按钮 */}
      <div className="text-center">
        <Button onClick={onRate} variant="outline" className="gap-2">
          <Plus className="h-4 w-4" />
          为这个副业评分
        </Button>
      </div>
    </div>
  );
}
