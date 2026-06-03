"use client";

import { useState, useEffect } from "react";
import { Star, Plus } from "lucide-react";
import { StarRating } from "@/components/rating/star-rating";
import { Button } from "@/components/ui/button";

interface RatingBreakdownProps {
  averageRating: number;
  ratingCount: number;
  distribution: Record<number, number>;
  onRate: () => void;
}

function DistributionBar({ star, count, total }: { star: number; count: number; total: number }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(total > 0 ? (count / total) * 100 : 0);
    }, 50);
    return () => clearTimeout(timer);
  }, [count, total]);

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="w-4 text-right text-muted-foreground">{star}</span>
      <Star className="h-3 w-3 fill-amber-400 text-amber-400 shrink-0" />
      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-amber-400 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
      <span className="w-8 text-right text-xs text-muted-foreground">{count}</span>
    </div>
  );
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
      <div className="text-center flex flex-col items-center gap-1.5">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-4xl font-bold text-primary">{averageRating}</span>
        </div>
        <StarRating value={Math.round(averageRating)} readOnly size="md" />
        <div className="text-sm text-muted-foreground">共 {ratingCount} 条评价</div>
      </div>

      {/* 中间：分布条 */}
      <div className="flex-1 space-y-1.5 w-full max-w-xs">
        {[5, 4, 3, 2, 1].map((star) => (
          <DistributionBar
            key={star}
            star={star}
            count={distribution[star] || 0}
            total={ratingCount}
          />
        ))}
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
