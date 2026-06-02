"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SideHustleCard } from "@/components/sidehustle/sidehustle-card";
import { SearchBar } from "@/components/search/search-bar";
import { FilterPanel } from "@/components/search/filter-panel";
import { SortSelect } from "@/components/search/sort-select";
import { ActiveFilters } from "@/components/search/active-filters";
import { useDebounce } from "@/hooks/use-debounce";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import type { SortOption } from "@/lib/constants";
import type { SideHustleCardData, PaginationMeta } from "@/types";
import { SlidersHorizontal, SearchX } from "lucide-react";

export default function BrowsePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 从 URL 读取初始状态
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [categories, setCategories] = useState<string[]>(
    searchParams.get("category") ? [searchParams.get("category")!] : []
  );
  const [difficulties, setDifficulties] = useState<string[]>(
    searchParams.get("difficulty") ? [searchParams.get("difficulty")!] : []
  );
  const [minIncome, setMinIncome] = useState(searchParams.get("minIncome") || "");
  const [maxIncome, setMaxIncome] = useState(searchParams.get("maxIncome") || "");
  const [sortBy, setSortBy] = useState<SortOption>(
    (searchParams.get("sortBy") as SortOption) || "newest"
  );
  const [page, setPage] = useState(parseInt(searchParams.get("page") || "1"));

  const debouncedSearch = useDebounce(search, 300);

  const [data, setData] = useState<SideHustleCardData[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(true);

  // 更新 URL
  const updateURL = useCallback(() => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.set("search", debouncedSearch);
    if (categories.length === 1) params.set("category", categories[0]);
    if (difficulties.length === 1) params.set("difficulty", difficulties[0]);
    if (minIncome) params.set("minIncome", minIncome);
    if (maxIncome) params.set("maxIncome", maxIncome);
    if (sortBy !== "newest") params.set("sortBy", sortBy);
    if (page > 1) params.set("page", page.toString());

    const queryString = params.toString();
    router.push(`/sidehustles${queryString ? `?${queryString}` : ""}`, { scroll: false });
  }, [debouncedSearch, categories, difficulties, minIncome, maxIncome, sortBy, page, router]);

  // 获取数据
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.set("page", page.toString());
        params.set("limit", "12");
        if (debouncedSearch) params.set("search", debouncedSearch);
        if (categories.length === 1) params.set("category", categories[0]);
        if (difficulties.length === 1) params.set("difficulty", difficulties[0]);
        if (minIncome) params.set("minIncome", minIncome);
        if (maxIncome) params.set("maxIncome", maxIncome);
        params.set("sortBy", sortBy);

        const res = await fetch(`/api/sidehustles?${params.toString()}`);
        if (res.ok) {
          const json = await res.json();
          setData(json.data);
          setPagination(json.pagination);
        }
      } catch (error) {
        console.error("获取数据失败:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    updateURL();
  }, [debouncedSearch, categories, difficulties, minIncome, maxIncome, sortBy, page]);

  const handleReset = () => {
    setCategories([]);
    setDifficulties([]);
    setMinIncome("");
    setMaxIncome("");
    setSortBy("newest");
    setPage(1);
  };

  const handleRemoveSearch = () => setSearch("");
  const handleRemoveCategory = (cat: string) =>
    setCategories(categories.filter((c) => c !== cat));
  const handleRemoveDifficulty = (diff: string) =>
    setDifficulties(difficulties.filter((d) => d !== diff));
  const handleResetAll = () => {
    setCategories([]);
    setDifficulties([]);
  };

  const filterPanel = (
    <FilterPanel
      selectedCategories={categories}
      selectedDifficulties={difficulties}
      minIncome={minIncome}
      maxIncome={maxIncome}
      onCategoriesChange={setCategories}
      onDifficultiesChange={setDifficulties}
      onMinIncomeChange={setMinIncome}
      onMaxIncomeChange={setMaxIncome}
      onReset={handleReset}
    />
  );

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* 搜索和排序 */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="flex-1">
          <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} />
        </div>
        <div className="flex gap-2">
          <Sheet>
            <SheetTrigger>
              <Button variant="outline" size="default" className="gap-2 lg:hidden">
                <SlidersHorizontal className="h-4 w-4" />
                筛选
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] overflow-y-auto">
              {filterPanel}
            </SheetContent>
          </Sheet>
          <SortSelect value={sortBy} onChange={(v) => { setSortBy(v); setPage(1); }} />
        </div>
      </div>

      {/* 活跃筛选 */}
      <div className="mb-4">
        <ActiveFilters
          search={debouncedSearch}
          categories={categories}
          difficulties={difficulties}
          onRemoveSearch={handleRemoveSearch}
          onRemoveCategory={handleRemoveCategory}
          onRemoveDifficulty={handleRemoveDifficulty}
          onResetAll={handleResetAll}
        />
      </div>

      <div className="flex gap-8">
        {/* 桌面筛选侧边栏 */}
        <aside className="hidden lg:block w-[240px] shrink-0">
          <div className="sticky top-20">{filterPanel}</div>
        </aside>

        {/* 主内容 */}
        <div className="flex-1 min-w-0">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-[360px] rounded-xl" />
              ))}
            </div>
          ) : data.length === 0 ? (
            <EmptyState search={debouncedSearch} />
          ) : (
            <>
              <div className="mb-4 text-sm text-muted-foreground">
                共找到 <span className="font-medium text-foreground">{pagination?.total || 0}</span> 个副业
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {data.map((item) => (
                  <SideHustleCard key={item.id} {...item} />
                ))}
              </div>

              {/* 分页 */}
              {pagination && pagination.totalPages > 1 && (
                <div className="mt-8">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (page > 1) setPage(page - 1);
                          }}
                          className={page <= 1 ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                      {Array.from({ length: Math.min(5, pagination.totalPages) }).map(
                        (_, i) => {
                          let pageNum: number;
                          if (pagination.totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (page <= 3) {
                            pageNum = i + 1;
                          } else if (page >= pagination.totalPages - 2) {
                            pageNum = pagination.totalPages - 4 + i;
                          } else {
                            pageNum = page - 2 + i;
                          }
                          return (
                            <PaginationItem key={pageNum}>
                              <PaginationLink
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setPage(pageNum);
                                }}
                                isActive={pageNum === page}
                              >
                                {pageNum}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        }
                      )}
                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (pagination && page < pagination.totalPages)
                              setPage(page + 1);
                          }}
                          className={
                            pagination && page >= pagination.totalPages
                              ? "pointer-events-none opacity-50"
                              : ""
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function EmptyState({ search }: { search: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <SearchX className="h-16 w-16 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold mb-2">
        {search ? `未找到"${search}"相关副业` : "暂无副业"}
      </h3>
      <p className="text-muted-foreground mb-4">
        {search
          ? "试试其他关键词，或者浏览全部副业"
          : "还没有人分享副业，来做第一个吧！"}
      </p>
      {search && (
        <a href="/sidehustles" className="text-primary hover:underline">
          浏览全部副业
        </a>
      )}
    </div>
  );
}
