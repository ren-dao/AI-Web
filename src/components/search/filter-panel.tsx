"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { CATEGORIES, DIFFICULTY_LEVELS } from "@/lib/constants";
import { RotateCcw } from "lucide-react";

interface FilterPanelProps {
  selectedCategories: string[];
  selectedDifficulties: string[];
  minIncome: string;
  maxIncome: string;
  onCategoriesChange: (cats: string[]) => void;
  onDifficultiesChange: (diffs: string[]) => void;
  onMinIncomeChange: (val: string) => void;
  onMaxIncomeChange: (val: string) => void;
  onReset: () => void;
}

export function FilterPanel({
  selectedCategories,
  selectedDifficulties,
  minIncome,
  maxIncome,
  onCategoriesChange,
  onDifficultiesChange,
  onMinIncomeChange,
  onMaxIncomeChange,
  onReset,
}: FilterPanelProps) {
  const toggleCategory = (cat: string) => {
    if (selectedCategories.includes(cat)) {
      onCategoriesChange(selectedCategories.filter((c) => c !== cat));
    } else {
      onCategoriesChange([...selectedCategories, cat]);
    }
  };

  const toggleDifficulty = (diff: string) => {
    if (selectedDifficulties.includes(diff)) {
      onDifficultiesChange(selectedDifficulties.filter((d) => d !== diff));
    } else {
      onDifficultiesChange([...selectedDifficulties, diff]);
    }
  };

  const hasFilters =
    selectedCategories.length > 0 ||
    selectedDifficulties.length > 0 ||
    minIncome ||
    maxIncome;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">筛选条件</h3>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={onReset} className="h-8 text-xs gap-1">
            <RotateCcw className="h-3 w-3" />
            重置
          </Button>
        )}
      </div>

      {/* 分类 */}
      <div>
        <h4 className="text-sm font-medium mb-2">分类</h4>
        <div className="space-y-1.5 max-h-[300px] overflow-y-auto">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.value}
              className={cn(
                "flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer hover:bg-muted transition-colors text-sm",
                selectedCategories.includes(cat.value) && "bg-primary/10 text-primary font-medium"
              )}
              onClick={() => toggleCategory(cat.value)}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* 难度 */}
      <div>
        <h4 className="text-sm font-medium mb-2">难度等级</h4>
        <div className="space-y-1.5">
          {DIFFICULTY_LEVELS.map((diff) => (
            <div
              key={diff.value}
              className={cn(
                "flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer hover:bg-muted transition-colors text-sm",
                selectedDifficulties.includes(diff.value) && "bg-primary/10 text-primary font-medium"
              )}
              onClick={() => toggleDifficulty(diff.value)}
            >
              <span
                className={cn(
                  "w-3 h-3 rounded-full border-2",
                  selectedDifficulties.includes(diff.value)
                    ? "bg-primary border-primary"
                    : "border-muted-foreground"
                )}
              />
              <span>{diff.label}</span>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* 收入范围 */}
      <div>
        <h4 className="text-sm font-medium mb-2">月收入范围 (元)</h4>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="最低"
            value={minIncome}
            onChange={(e) => onMinIncomeChange(e.target.value)}
            className="h-9 text-sm"
          />
          <span className="text-muted-foreground">-</span>
          <Input
            type="number"
            placeholder="最高"
            value={maxIncome}
            onChange={(e) => onMaxIncomeChange(e.target.value)}
            className="h-9 text-sm"
          />
        </div>
      </div>
    </div>
  );
}
