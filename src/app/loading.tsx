import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      <Skeleton className="h-10 w-64 mx-auto mb-6" />
      <Skeleton className="h-6 w-96 mx-auto mb-12" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-[360px] rounded-xl" />
        ))}
      </div>
    </div>
  );
}
