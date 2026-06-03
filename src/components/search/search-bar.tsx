"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = "搜索副业..." }: SearchBarProps) {
  return (
    <div className="relative transition-all duration-200 focus-within:scale-[1.01]">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-10 pr-10 h-11 text-base transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:shadow-sm"
      />
      {value && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 transition-all hover:scale-110 hover:text-destructive"
          onClick={() => onChange("")}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
