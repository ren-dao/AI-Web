"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Search } from "lucide-react";

interface SearchCommandProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Suggestion {
  id: string;
  title: string;
  category: string;
  slug: string;
}

export function SearchCommand({ open, onOpenChange }: SearchCommandProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);

  // Ctrl+K 快捷键
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        e.preventDefault();
        onOpenChange(true);
      }
    },
    [onOpenChange]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // 搜索自动补全
  useEffect(() => {
    if (query.length < 1) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setSuggestions(data.suggestions || []);
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchSuggestions, 200);
    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (suggestion: Suggestion) => {
    onOpenChange(false);
    router.push(`/sidehustles/${suggestion.id}`);
  };

  const handleSearchAll = () => {
    onOpenChange(false);
    router.push(`/sidehustles?search=${encodeURIComponent(query)}`);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder="搜索副业..."
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty>
          {loading ? (
            <div className="flex items-center justify-center gap-2 py-6 text-muted-foreground">
              <Search className="h-4 w-4 animate-pulse" />
              搜索中...
            </div>
          ) : query.length > 0 ? (
            <div className="py-6 text-center">
              <p className="text-muted-foreground mb-2">未找到相关副业</p>
              <button
                onClick={handleSearchAll}
                className="text-sm text-primary hover:underline"
              >
                查看全部搜索结果
              </button>
            </div>
          ) : (
            <div className="py-6 text-center text-muted-foreground">
              输入关键词搜索副业...
            </div>
          )}
        </CommandEmpty>

        {suggestions.length > 0 && (
          <CommandGroup heading="搜索结果">
            {suggestions.map((s) => (
              <CommandItem
                key={s.id}
                onSelect={() => handleSelect(s)}
                className="flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span>{s.title}</span>
                </div>
                <span className="text-xs text-muted-foreground">{s.category}</span>
              </CommandItem>
            ))}
            <CommandItem
              onSelect={handleSearchAll}
              className="text-primary cursor-pointer justify-center"
            >
              查看全部 &quot;{query}&quot; 的搜索结果 →
            </CommandItem>
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
}
