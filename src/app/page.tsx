import { HeroSection } from "@/components/home/hero-section";
import { FeaturedGrid } from "@/components/home/featured-grid";
import { CategoryBrowse } from "@/components/home/category-browse";
import { StatsBar } from "@/components/home/stats-bar";
import { FadeInSection } from "@/components/ui/fade-in-section";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <Suspense fallback={<FeaturedSkeleton />}>
        <FadeInSection>
          <FeaturedGrid />
        </FadeInSection>
      </Suspense>
      <FadeInSection delay={100}>
        <CategoryBrowse />
      </FadeInSection>
      <Suspense fallback={<StatsSkeleton />}>
        <FadeInSection delay={200}>
          <StatsBar />
        </FadeInSection>
      </Suspense>
    </div>
  );
}

function FeaturedSkeleton() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-10">
          <Skeleton className="h-9 w-64 mx-auto mb-3" />
          <Skeleton className="h-5 w-80 mx-auto" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-[360px] rounded-xl" />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsSkeleton() {
  return (
    <section className="py-12 bg-gradient-to-r from-primary to-purple-600">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="text-center">
              <Skeleton className="h-10 w-20 mx-auto mb-1 bg-white/20" />
              <Skeleton className="h-4 w-16 mx-auto bg-white/20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
