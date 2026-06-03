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
        <span className="animate-in fade-in slide-in-from-left-2 duration-200">
          <Badge variant="secondary" className="gap-1 px-3 py-1">
            搜索: {search}
            <button onClick={onRemoveSearch} className="hover:text-destructive transition-colors">
              <X className="h-3 w-3 ml-1" />
            </button>
          </Badge>
        </span>
      )}
      {categories.map((cat) => (
        <span key={cat} className="animate-in fade-in slide-in-from-left-2 duration-200">
          <Badge variant="secondary" className="gap-1 px-3 py-1">
            {cat}
            <button onClick={() => onRemoveCategory(cat)} className="hover:text-destructive transition-colors">
              <X className="h-3 w-3 ml-1" />
            </button>
          </Badge>
        </span>
      ))}
      {difficulties.map((diff) => (
        <span key={diff} className="animate-in fade-in slide-in-from-left-2 duration-200">
          <Badge variant="secondary" className="gap-1 px-3 py-1">
            {diff}
            <button onClick={() => onRemoveDifficulty(diff)} className="hover:text-destructive transition-colors">
              <X className="h-3 w-3 ml-1" />
            </button>
          </Badge>
        </span>
      ))}
      {(categories.length > 0 || difficulties.length > 0) && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onResetAll}
          className="h-7 text-xs transition-all duration-200 hover:text-destructive"
        >
          清除全部
        </Button>
      )}
    </div>
  );
}
