import { StarRating } from "@/components/rating/star-rating";

interface RatingDisplayProps {
  averageRating: number;
  ratingCount: number;
  size?: "sm" | "md" | "lg";
}

export function RatingDisplay({ averageRating, ratingCount, size = "md" }: RatingDisplayProps) {
  return (
    <div className="flex items-center gap-2">
      <StarRating value={Math.round(averageRating)} readOnly size={size} />
      <span className="font-bold">{averageRating}</span>
      <span className="text-muted-foreground">({ratingCount} 评价)</span>
    </div>
  );
}
