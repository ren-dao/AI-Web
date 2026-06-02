"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ActiveFiltersProps {
  search: string;
  categories: string[];
  difficulties: string[];
  onRemoveSearch: () => void;
  onRemoveCategory: (cat: string) => void;
  onRemoveDifficulty: (diff: string) => void;
  onResetAll: () => void;
}

export function ActiveFilters({
  search,
  categories,
  difficulties,
  onRemoveSearch,
  onRemoveCategory,
  onRemoveDifficulty,
  onResetAll,
}: ActiveFiltersProps) {
  const hasFilters = search || categories.length > 0 || difficulties.length > 0;

  if (!hasFilters) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {search && (
        <Badge variant="secondary" className="gap-1 px-3 py-1">
          搜索: {search}
          <button onClick={onRemoveSearch}>
            <X className="h-3 w-3 ml-1" />
          </button>
        </Badge>
      )}
      {categories.map((cat) => (
        <Badge key={cat} variant="secondary" className="gap-1 px-3 py-1">
          {cat}
          <button onClick={() => onRemoveCategory(cat)}>
            <X className="h-3 w-3 ml-1" />
          </button>
        </Badge>
      ))}
      {difficulties.map((diff) => (
        <Badge key={diff} variant="secondary" className="gap-1 px-3 py-1">
          {diff}
          <button onClick={() => onRemoveDifficulty(diff)}>
            <X className="h-3 w-3 ml-1" />
          </button>
        </Badge>
      ))}
      {(categories.length > 0 || difficulties.length > 0) && (
        <Button variant="ghost" size="sm" onClick={onResetAll} className="h-7 text-xs">
          清除全部
        </Button>
      )}
    </div>
  );
}
