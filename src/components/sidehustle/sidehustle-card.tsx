import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, DollarSign, Eye } from "lucide-react";
import { formatCurrency } from "@/lib/format";
import { DIFFICULTY_LEVELS } from "@/lib/constants";
import type { SideHustleCardData } from "@/types";

export function SideHustleCard(props: SideHustleCardData) {
  const difficulty = DIFFICULTY_LEVELS.find((d) => d.value === props.difficulty);
  const skills = JSON.parse(props.requiredSkills || "[]") as string[];

  return (
    <Link href={`/sidehustles/${props.id}`}>
      <Card className="group h-full overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        {/* 封面图 */}
        <div className="relative h-40 sm:h-48 overflow-hidden bg-muted">
          {props.coverImage ? (
            <img
              src={props.coverImage}
              alt={props.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
              💼
            </div>
          )}
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
              {props.category}
            </Badge>
            {difficulty && (
              <Badge className={`text-xs ${difficulty.color}`}>
                {difficulty.label}
              </Badge>
            )}
          </div>
        </div>

        <CardContent className="p-4">
          {/* 标题 */}
          <h3 className="font-bold text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors">
            {props.title}
          </h3>

          {/* 描述 */}
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {props.description}
          </p>

          {/* 技能标签 */}
          <div className="flex flex-wrap gap-1 mb-3">
            {skills.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
              >
                {skill}
              </span>
            ))}
            {skills.length > 3 && (
              <span className="text-xs px-2 py-0.5 text-muted-foreground">
                +{skills.length - 3}
              </span>
            )}
          </div>

          {/* 统计信息 */}
          <div className="flex items-center justify-between text-sm text-muted-foreground pt-3 border-t">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-medium text-foreground">{props.averageRating}</span>
              <span>({props.ratingCount})</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4 text-green-500" />
              <span>{formatCurrency(props.incomeMin)}-{formatCurrency(props.incomeMax)}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{props.timeInvestment}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              <span>{props.viewCount}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
